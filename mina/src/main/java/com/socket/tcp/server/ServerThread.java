package com.socket.tcp.server;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class ServerThread extends Thread {
    Socket socket = null; // 保存与本线程相关的Socket对象

    int clientnum; // 保存本进程的客户计数

    public ServerThread(Socket socket, int num) { // 构造函数
        this.socket = socket; // 初始化socket变量
        clientnum = num + 1; // 初始化clientnum变量
        System.out.println(clientnum);
    }

    public void run() { 
        // 线程主体
        BufferedReader is = null;
        // 由Socket对象得到输入流，并构造相应的BufferedReader对象
        PrintWriter os = null;
        try {
            String line;
            os = new PrintWriter(socket.getOutputStream());
            is = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            // 由Socket对象得到输出流，并构造PrintWriter对象
            BufferedReader sin = new BufferedReader(new InputStreamReader(System.in));
            // 由系统标准输入设备构造BufferedReader对象
            System.out.println("Client:" + is.readLine());
            // 在标准输出上打印从客户端读入的字符串
            line = sin.readLine();
            // 从标准输入读入一字符串
            while (!line.equals("bye")) {
                // 如果该字符串为 "bye"，则停止循环
                os.println(line);
                // 向客户端输出该字符串
                os.flush();
                // 刷新输出流，使Client马上收到该字符串
                System.out.println("Server:" + line);
                // 在系统标准输出上打印读入的字符串
                System.out.println("Client:" + is.readLine());
                // 从Client读入一字符串，并打印到标准输出上
                line = sin.readLine();
                // 从系统标准输入读入一字符串
            } // 继续循环
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            try{
                os.close(); // 关闭Socket输出流
                is.close(); // 关闭Socket输入流
            }catch(Exception e){
                e.printStackTrace();
            }
        }
    }
}
