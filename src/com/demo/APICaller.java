package com.demo;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.net.URISyntaxException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class APICaller
 */
@WebServlet(description = "Servlet for making API requests", urlPatterns = { "/apicaller/*" })
public class APICaller extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2275557619378893327L;
	private static final String API_KEY = "35369ac861858954be41bc503051c46b";
	private static final String APPLICATION_ID = "1cf39b0d";
	private static final String API_BASE_URL = "developer.goibibo.com/";
	private static Gson gson = new Gson();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public APICaller() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		switch (request.getPathInfo()) {
		case "/flight":
			flightSearch(request, response);
			break;
		case "/minimumfare":
			minimumFare(request, response);
			break;
		default:
			response.setStatus(400);
			break;
		}
	}

	private void minimumFare(HttpServletRequest request,
			HttpServletResponse response) {

	}

	public URI buildURI(String path, HttpServletRequest request) {
		URIBuilder uriBuilder = new URIBuilder();

		try {
			uriBuilder.setScheme("http");
			uriBuilder.setHost(API_BASE_URL);
			uriBuilder.setPath(path);
			uriBuilder.setParameter("app_id", APPLICATION_ID);
			uriBuilder.setParameter("app_key", API_KEY);
			uriBuilder.setParameter("format", "json");

			if (path.contains("search")) {
				uriBuilder.setParameter("source",
						request.getParameter("source"));
				uriBuilder.setParameter("destination",
						request.getParameter("destination"));
				uriBuilder.setParameter("dateofdeparture",
						request.getParameter("dateofdeparture"));
				uriBuilder.setParameter("dateofarrival",
						request.getParameter("dateofarrival"));
				uriBuilder.setParameter("seatingclass",
						request.getParameter("seatingclass"));
				uriBuilder.setParameter("adults",
						request.getParameter("adults"));
				uriBuilder.setParameter("children",
						request.getParameter("children"));
				uriBuilder.setParameter("infants",
						request.getParameter("infants"));
			}

			return uriBuilder.build();

		} catch (URISyntaxException e) {
			return null;
		}
	}

	private void flightSearch(HttpServletRequest request,
			HttpServletResponse response) {
		PrintWriter writer = null;
		JsonObject o = new JsonObject();
		response.setContentType("application/json");
		try {
			String path = "api/search/";
			writer = response.getWriter();
			CloseableHttpClient httpclient = HttpClients.createDefault();
			URI uri = buildURI(path, request);
			HttpGet httpGet = new HttpGet(uri);
			CloseableHttpResponse response1 = httpclient.execute(httpGet);
			System.out.println(response1.getStatusLine());
			HttpEntity entity = response1.getEntity();
			if (entity != null) {
				String retSrc = EntityUtils.toString(entity);
				// parsing JSON
				JsonParser parser = new JsonParser();
				o = (JsonObject) parser.parse(retSrc);
				o.addProperty("success", "true");
				writer.write(gson.toJson(o));
			}

		} catch (IOException e) {
			o.addProperty("success", "false");
			writer.write(gson.toJson(o));
		} finally {
			writer.flush();
			writer.close();
		}
	}

}
