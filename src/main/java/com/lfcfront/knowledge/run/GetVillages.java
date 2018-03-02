package com.lfcfront.knowledge.run;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.lfcfront.knowledge.common.util.ExcelWriter;

public class GetVillages {
	
	private static final String url = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2016/41.html";
	private static final int timeout = 5000;
	private static final String userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36";
	private static final String connetion = "close";
	private static final String encoding = "gbk";
	private static int count = 1;

	public static void main(String[] args) {
		List<Map<Integer, String>> list = new ArrayList<Map<Integer, String>>();
		Map<Integer, String> map = null;
		boolean isConnected = false;
		try {
			// 获取整个网站的根节点
			System.out.println(111);
			Document document = Jsoup.parse(new URL(url).openStream(), encoding, url);
			
			Elements citys = document.getElementsByClass("citytr");
			for (Element e : citys) {
				String shijiCode = e.child(0).child(0).text();
				String shijiName = e.child(1).child(0).text();
				String shijiHref = e.child(1).child(0).attr("abs:href");
				// 点击市级链接，进入区级单位
				do {
					try {
						System.out.println(222);
						document = Jsoup.parse(new URL(shijiHref).openStream(), encoding, shijiHref);
//						document = Jsoup.connect(shijiHref).header("User-Agent", userAgent)
//								.header("Connection", "close").timeout(timeout).post();
						isConnected = true;
					} catch (Exception e2) {
						isConnected = false;
						System.out.println("1次没连接上，链接："+shijiHref);
					}
				} while (!isConnected);
				Elements qus = document.getElementsByClass("countytr");
				for (Element qu : qus) {
					try {
						String quCode = qu.child(0).child(0).text();
						String quName = qu.child(1).child(0).text();
						String quHref = qu.child(1).child(0).attr("abs:href");
						// 点击区级链接，进入街道办事处
						do {
							try {
								System.out.println(333);
								document = Jsoup.parse(new URL(quHref).openStream(), encoding, quHref);
//								document = Jsoup.connect(quHref).header("User-Agent", userAgent)
//										.header("Connection", "close").timeout(timeout).post();
								isConnected = true;
							} catch (Exception e2) {
								isConnected = false;
								System.out.println("1次没连接上，链接："+quHref);
							}
						} while (!isConnected);
						Elements jiedaos = document.getElementsByClass("towntr");
						for (Element jiedao : jiedaos) {
							String jiedaoCode = jiedao.child(0).child(0).text();
							String jiedaoName = jiedao.child(1).child(0).text();
							String jiedaoHref = jiedao.child(1).child(0).attr("abs:href");
							// 点击街道办，进入村委会
							do {
								try {
									Thread.sleep(1000);
									System.out.println(444);
									document = Jsoup.parse(new URL(jiedaoHref).openStream(), encoding, jiedaoHref);
//									document = Jsoup.connect(jiedaoHref).header("User-Agent", userAgent)
//											.header("Connection", "close").timeout(timeout).post();
									isConnected = true;
								} catch (Exception e2) {
									isConnected = false;
									System.out.println("1次没连接上，链接："+jiedaoHref);
								}
							} while (!isConnected);
							Elements cunweis = document.getElementsByClass("villagetr");
							for (Element cunwei : cunweis) {
								String cunweiCode = cunwei.child(0).text();
								String cunweiTypeCode = cunwei.child(1).text();
								String cunweiName = cunwei.child(2).text();
								if (cunweiName.contains("委员会") && !cunweiName.contains("村民委员会")) {
									continue;
								}
								map = new HashMap<Integer, String>();
								map.put(1, shijiCode);
								map.put(2, shijiName);
								map.put(3, quCode);
								map.put(4, quName);
								map.put(5, jiedaoCode);
								map.put(6, jiedaoName);
								map.put(7, cunweiCode);
								map.put(8, cunweiTypeCode);
								map.put(9, cunweiName);
								System.out.println(count+++"条数据已加入");
								list.add(map);
							}
						}
					} catch (IndexOutOfBoundsException e1) {
					}
				}
			}
			new ExcelWriter().write("/Users/zks/Downloads/结果.xlsx", list);
			System.out.println("写完毕");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}