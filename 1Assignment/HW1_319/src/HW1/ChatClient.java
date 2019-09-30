package HW1;

import java.io.*;
import java.net.*;
import java.util.*;
import java.*;

public class ChatClient {

	public static void main(String[] args) throws UnknownHostException,
			IOException {
		System.out.print("Enter name: "); 
		Scanner sc = new Scanner(System.in);
		boolean done = false;
		String username = "";
		while (!done) {
			username = sc.nextLine();
			if (!username.equals("")) {
				done = true;
			}
		}
		
		Socket socket = new Socket("localhost", 4444);
		
//		Scanner sc = new Scanner(System.in);
//		boolean done = false;
//		String name = "";
//		while (!done) {
//			System.out.print("Enter name: ");
//			name = sc.nextLine();
//			if (!name.equals("")) {
//				done = true;
//			}
//		}
//		sc.close();
		
		BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		PrintWriter out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()), true);
		BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in));
		
		Thread t = new Thread(new ServiceHandler(socket));
		t.start();
		
	    System.out.print("Enter message: ");
		String userInput;
		while ((userInput = stdIn.readLine()) != null) {
			System.out.println();
		    System.out.print("Enter message: ");
		    out.println(username + ": " + userInput);
		}
	}
}

class ServiceHandler implements Runnable {
	Socket s;
	
	ServiceHandler(Socket s) {
		this.s = s;
	}

	
	public void run() {
		Scanner in;
		
		try {	
			in = new Scanner(new BufferedInputStream(s.getInputStream())); 
			while (in.hasNext()) {
		
				String serverMessage = in.nextLine();
				
				//System.out.println();
//				Scanner temp = new Scanner(serverMessage);
//				String from = temp.next();
//				String msgBody = "";
//				while (temp.hasNext()) {
//					msgBody += temp.next();
//				}
//				temp.close();
				System.out.println();
				System.out.println("Message from " + serverMessage );
				System.out.print("Enter message: ");
			}			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
