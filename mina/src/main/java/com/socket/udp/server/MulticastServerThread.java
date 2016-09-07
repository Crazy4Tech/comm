package com.socket.udp.server;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.util.Date;

public class MulticastServerThread extends QuoteServerThread {

    private long FIVE_SECONDS = 5000; // 定义常量，5秒钟

    public MulticastServerThread() throws IOException {
        super("MulticastServerThread");
        // 调用父类，也就是QuoteServerThread的构造函数
    }

    // 重写父类的线程主体
    public void run() {
        while (moreQuotes) {
            // 根据标志变量判断是否继续循环
            try {
                byte[] buf = new byte[256];
                // 创建缓冲区
                String dString = null;
                if (in == null)
                    dString = new Date().toString();
                // 如果初始化的时候打开文件失败了，
                // 则使用日期作为要传送的字符串
                else
                    dString = getNextQuote();
                // 否则调用成员函数从文件中读出字符串
                buf = dString.getBytes();
                // 把String转换成字节数组，以便传送send it
                InetAddress group = InetAddress.getByName("230.0.0.1");
                // 得到230.0.0.1的地址信息
                DatagramPacket packet = new DatagramPacket(buf, buf.length, group, 4446);
                // 根据缓冲区，广播地址，和端口号创建DatagramPacket对象
                socket.send(packet); // 发送该Packet
                try {
                    sleep((long) (Math.random() * FIVE_SECONDS));
                    // 随机等待一段时间，0～5秒之间
                } catch (InterruptedException e) {
                } // 异常处理
            } catch (IOException e) { // 异常处理
                e.printStackTrace(); // 打印错误栈
                moreQuotes = false; // 置结束循环标志
            }
        }
        socket.close(); // 关闭广播套接口
    }
}
