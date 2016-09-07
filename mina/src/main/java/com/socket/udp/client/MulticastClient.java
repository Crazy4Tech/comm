package com.socket.udp.client;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.nio.charset.Charset;

public class MulticastClient {

    public static void main(String args[]) throws IOException {

        MulticastSocket socket = new MulticastSocket(4446);
        // 创建4446端口的广播套接字
        InetAddress address = InetAddress.getByName("230.0.0.1");
        // 得到230.0.0.1的地址信息
        socket.joinGroup(address);
        // 使用joinGroup()将广播套接字绑定到地址上
        DatagramPacket packet;
        for (;;) {
            byte[] buf = new byte[256];
            // 创建缓冲区
            packet = new DatagramPacket(buf, buf.length);
            // 创建接收数据报
            socket.receive(packet); // 接收
            byte[] tmp = packet.getData();
            String received = new String(tmp,Charset.forName("UTF-8"));
            if("-End-".equals(received)){
                break;
            }
            // 由接收到的数据报得到字节数组，
            // 并由此构造一个String对象
            System.out.println("Quote of theMoment:" + received);
            // 打印得到的字符串
        } // 循环5次
        System.out.println("-End-");
        socket.leaveGroup(address);
        // 把广播套接字从地址上解除绑定
        socket.close(); // 关闭广播套接字
        System.exit(0);
    }
}
