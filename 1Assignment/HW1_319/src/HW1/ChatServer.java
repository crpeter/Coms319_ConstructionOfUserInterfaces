package HW1;
import java.io.*;
import java.net.*;
import java.util.*;

public class ChatServer {

	public static void main(String[] args) throws IOException {
		
		ArrayList<ClientHandler> clientList = new ArrayList<>();

		ServerSocket serverSocket = null;
		int clientNum = 0; // keeps track of how many clients were created

		// 1. CREATE A NEW SERVERSOCKET
		try {
			serverSocket = new ServerSocket(4444); // provide MYSERVICE at port
													// 4444
			System.out.println(serverSocket);
		} catch (IOException e) {
			System.out.println("Could not listen on port: 4444");
			System.exit(-1);
		}
		

		// 2. LOOP FOREVER - SERVER IS ALWAYS WAITING TO PROVIDE SERVICE!
		while (true) {
			Socket clientSocket = null;
			try {
				clientSocket = serverSocket.accept();

				
				System.out.println("Server got connected to a client" + ++clientNum);
				ClientHandler client = new ClientHandler(clientSocket, clientNum);
				
				clientList.add(client);
				for (int i = 0; i < clientList.size(); i++) {
					clientList.get(i).otherClients.clear();
					for (int j = 0; j < clientList.size(); j++) {
						clientList.get(i).otherClients.add(clientList.get(j));
					}
				}
				Thread t = new Thread(client);
				t.start();

			} catch (IOException e) {
				System.out.println("Accept failed: 4444");
				System.exit(-1);
			}
		}
	} 
	// end of main method
} 
// end of class MyServer



class ClientHandler implements Runnable {
	Socket s;
	int num;
	String name;
	ArrayList<ClientHandler> otherClients = new ArrayList<>();
	
	
	ClientHandler(Socket s, int n) {
		this.s = s;
		num = n;
		this.name = name;
	}

	
	public void run() {
		for (int i = 0; i < otherClients.size(); i++) {
			if (otherClients.get(i).num == this.num) {
				otherClients.remove(i);
			}
		}
		Scanner in;
		
		try {
			while (true) {
				// 1. USE THE SOCKET TO READ WHAT THE CLIENT IS SENDING
				in = new Scanner(new BufferedInputStream(s.getInputStream())); 
				String clientMessage = in.nextLine();
				
				// 2. PRINT WHAT THE CLIENT SENT
				System.out.println("Message from Client" + num + ":"  + clientMessage);
				
				// send to all other clients
				for (int i = 0; i < otherClients.size(); i++) {
					//System.out.println("sending to: " + otherClients.get(i).num);
					otherClients.get(i).sendToClients(clientMessage, this.num);
				}
			}
			
			
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("disconnected from client: " + this.num);
		}
		
	}
	
	
	void sendToClients(String msg, int num) {
		try {
			if (num != this.num) {
				PrintWriter out = new PrintWriter(new BufferedOutputStream(s.getOutputStream()), true);
				out.println(msg);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	

	void printSocketInfo(Socket s) {
		System.out.print("Socket on Server " + Thread.currentThread() + " ");
		System.out.print("Server socket Local Address: " + s.getLocalAddress()
				+ ":" + s.getLocalPort());
		System.out.println("  Server socket Remote Address: "
				+ s.getRemoteSocketAddress());
	} 
	// end of printSocketInfo
	
} 
