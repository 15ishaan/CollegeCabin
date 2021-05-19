package com.ishaan.project.service;

import com.ishaan.project.model.AuthenticationProvider;
import com.ishaan.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

//
//    @Autowired
//    private RegistrationService service;
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//
//        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//        String username = oAuth2User.getUsername();
//        String name = oAuth2User.getName();
//        User user = service.fetchUserByUsername(username);
//        if(user == null){
//            service.createNewUserAfterOAuthLoginSuccess(username, name, AuthenticationProvider.GOOGLE);
//        }
//        else{
//            service.updateUserAfterOAuthLoginSuccess(user, name, AuthenticationProvider.GOOGLE);
//        }
//        super.onAuthenticationSuccess(request, response, authentication);
//    }
}
