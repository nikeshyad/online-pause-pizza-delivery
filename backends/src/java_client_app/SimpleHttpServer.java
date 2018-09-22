import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.net.URI;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.Headers;

//this gets a url and sends a json file based on the url
//the comments describe the line below 
public class SimpleHttpServer {

	public static void main(String[] args) throws Exception {
	    HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
	    server.createContext("/info", new InfoHandler());
	    //info and get are just tests
	    server.createContext("/get", new GetHandler());
	    //creates context with the text entered in the browser
	    server.createContext("/", new HttpHandler(){ 
		    @Override
		    public void handle(final HttpExchange exchange) throws IOException {
		    	URI uri = exchange.getRequestURI();
		    	String result = "../../assets"
		    	result += uri.toString();
		    	result += "/list.json";
		    	File file = new File(result);
				exchange.sendResponseHeaders(200, file.length());
				OutputStream outputStream=exchange.getResponseBody();
				Files.copy(file.toPath(), outputStream);
				outputStream.close();
				}
		});
		//creates a default executor
	    server.setExecutor(null);
	    server.start();
	  }

  static class InfoHandler implements HttpHandler {
    public void handle(HttpExchange t) throws IOException {
	    String response = "Wassup this is pause pizza app yo";
	    t.sendResponseHeaders(200, response.length());
	    OutputStream os = t.getResponseBody();
	    os.write(response.getBytes());
	    os.close();
    	}
	}

  static class GetHandler implements HttpHandler {
    public void handle(HttpExchange t) throws IOException {
	    File file = new File("/Users/rustamkosherbay/Desktop/pause/api/archives/v4/pizza/list.json");
		t.sendResponseHeaders(200, file.length());
		OutputStream outputStream=t.getResponseBody();
		Files.copy(file.toPath(), outputStream);
		outputStream.close();
	    }
	}
}