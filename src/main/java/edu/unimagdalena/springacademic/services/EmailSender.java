package edu.unimagdalena.springacademic.services;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

/**
 * EmailSender
 */
@Component
public class EmailSender {

  private static Logger LOG = Logger.getLogger(EmailSender.class);

  @Autowired
  public JavaMailSender emailSender;

  public void sendMessage(String toEmail, String token) {
    SimpleMailMessage message = new SimpleMailMessage();
    LOG.info(toEmail);
    message.setTo(toEmail);
    message.setSubject("Academic Password Recovery");
    String msg = "Hola! Hemos detectado que has perdido el acceso a tu cuenta. Para recuperarla entra al siguiente link.";
    msg += "\n\nlocalhost:8080/restablecerContraseña?token=" + token;
    message.setText(msg);
    emailSender.send(message);
  }

}