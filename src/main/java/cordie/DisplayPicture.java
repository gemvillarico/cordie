package cordie;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cordie.model.User;
import cordie.service.UserService;

public class DisplayPicture extends HttpServlet {
	
	private static final long serialVersionUID = 865455301646074516L;
	
	@Inject
	private UserService userService;
   
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
    	
    	String username = request.getParameter("username");
    	User user = userService.getUserByUsername(username);

        //get the image file
    	if (user.getDisplayImage() != null) {
    		InputStream inputStream = new ByteArrayInputStream(user.getDisplayImage());
    		
            String contentType = URLConnection.guessContentTypeFromStream(inputStream);
            
            int BUFFER_SIZE = 10240;
            // Set servlet response.
            response.reset();
            response.setBufferSize(BUFFER_SIZE );
            response.setContentType(contentType);
            //response.setHeader("Content-Length",  String.valueOf(image.length()));

            // Prepare streams.
            BufferedInputStream input = null;
            BufferedOutputStream output = null;

            try {
                // Open streams.
            	input = new BufferedInputStream(inputStream, BUFFER_SIZE);
                output = new BufferedOutputStream(response.getOutputStream(), BUFFER_SIZE);

                // Write image to response.
                byte[] buffer = new byte[BUFFER_SIZE];
                int length;
                while ((length = input.read(buffer)) > 0) {
                    output.write(buffer, 0, length);
                }
            } finally {
                // Close streams.
                output.close();
                input.close();
            }
        } else {
            //System.out.println("Could not Find the image");
        }
    } 

    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
    } 

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }

}
