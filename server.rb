require 'webrick'
require 'json'
require 'data_uri'

# default port to 3000 or overwrite with PORT variable by running
# $ PORT=3001 ruby server.rb
port = ENV['PORT'] ? ENV['PORT'].to_i : 3000

puts "Server started: http://localhost:#{port}/"

root = File.expand_path './public'
server = WEBrick::HTTPServer.new Port: port, DocumentRoot: root

server.mount_proc '/submit' do |request, response|
  if (request.request_method == 'POST')
    
    puts "\nUser has submitted the image ...\n"
    puts "Generating JPG file ... "
    uri = URI::Data.new(request.query['imgURL'])
    File.write('./canvas.jpg', uri.data)
    
    puts "Execute command >>> python scripts/writeJSON.py #{request.query['target']}"
    imgArray = `python scripts/writeJSON.py "#{request.query['target']}"`
  end
end

# server.mount_proc '/api/comments' do |req, res|
#   comments = JSON.parse(File.read('./comments.json', encoding: 'UTF-8'))

#   if req.request_method == 'POST'
#     # Assume it's well formed
#     comment = { id: (Time.now.to_f * 1000).to_i }
#     req.query.each do |key, value|
#       comment[key] = value.force_encoding('UTF-8') unless key == 'id'
#     end
#     comments << comment
#     File.write(
#       './comments.json',
#       JSON.pretty_generate(comments, indent: '    '),
#       encoding: 'UTF-8'
#     )
#   end

#   # always return json
#   res['Content-Type'] = 'application/json'
#   res['Cache-Control'] = 'no-cache'
#   res['Access-Control-Allow-Origin'] = '*'
#   res.body = JSON.generate(comments)
# end

trap('INT') { server.shutdown }

server.start