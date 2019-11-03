package edu.unimagdalena.springacademic.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 * SecurityServiceImpl
 */
@Service
public class SecurityServiceImpl implements ISecurityService {

  private static Logger LOG = LoggerFactory.getLogger(SecurityServiceImpl.class);

  @Override
  public String getLoggedInUsername() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String username = ((UserDetails) principal).getUsername();
    LOG.debug("Logged In Username: " + username);
    return username;
  }

}