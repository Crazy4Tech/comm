package com.socket.tcp.server;

import java.io.IOException;
import java.net.ServerSocket;

public class TalkServer {
    
    public static void main(String args[]) {
        ServerSocket serverSocket = null;
        boolean listening = true;
        try {
            // 创建一个ServerSocket在端口4700监听客户请求
            serverSocket = new ServerSocket(4700);
            int clientnum = 0;
            while (listening) { // 永远循环监听
                new ServerThread(serverSocket.accept(), clientnum).start();
                // 监听到客户请求，根据得到的Socket对象和 客户计数创建服务线程，并启动之
                clientnum++; // 增加客户计数
                System.out.println(clientnum);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (serverSocket != null) {
                try {
                    serverSocket.close(); // 关闭ServerSocket
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

    }
}
