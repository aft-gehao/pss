package com.afanti.psi.utils;

import java.security.MessageDigest;

public class PassUtil {

    public static void main(String[] args) {
        String hp = "admin";
        hp = Jia(hp);
        System.out.println(hp);
    }
    private static final String ALGORITHM = "MD5";
    /**
     * 保存
     */
    public static String Jia(String str) {
        str = Md5(str);
        str = Hash(str);
        return str;
    }

    /**
     * 普通
     */
    public static String Md5(String str) {
        if (str == null) {
            return null;
        }
        try {
            MessageDigest messageDigest = MessageDigest.getInstance(ALGORITHM);
            messageDigest.update(str.getBytes());
            return getFormattedText(messageDigest.digest());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 混淆
     */
    public static String Hash(String str) {
        String aStr = str.substring(0, 8);
        aStr = new StringBuffer(aStr).reverse().toString();
        String bStr = str.substring(8, 16);
        bStr = new StringBuffer(bStr).reverse().toString();
        String cStr = str.substring(16, 24);
        cStr = new StringBuffer(cStr).reverse().toString();
        String dStr = str.substring(24, 32);
        dStr = new StringBuffer(dStr).reverse().toString();
        str = aStr + bStr + cStr + dStr;
        return str;
    }

    private static final char[] HEX_DIGITS = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};

    /**
     * Takes the raw bytes from the digest and formats them correct.
     *
     * @param bytes the raw bytes from the digest.
     * @return the formatted bytes.
     */
    private static String getFormattedText(byte[] bytes) {
        int len = bytes.length;
        StringBuilder buf = new StringBuilder(len * 2);
        // 把密文转换成十六进制的字符串形式
        for (int j = 0; j < len; j++) {
            buf.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
            buf.append(HEX_DIGITS[bytes[j] & 0x0f]);
        }
        return buf.toString().toUpperCase();
    }
}