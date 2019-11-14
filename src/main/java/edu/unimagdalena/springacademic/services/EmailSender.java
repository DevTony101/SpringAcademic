package edu.unimagdalena.springacademic.services;

import java.util.Properties;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import edu.unimagdalena.springacademic.utils.Constants;

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

  @Bean
  public JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost("smtp.gmail.com");
    mailSender.setPort(587);

    mailSender.setUsername(Constants.GMAIL_USER);
    mailSender.setPassword(Constants.GMAIL_PASSWORD);

    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    // props.put("mail.debug", "true");

    return mailSender;
  }

}