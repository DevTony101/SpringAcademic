package edu.unimagdalena.springacademic.security;

/**
 * ISecurityService
 */
public interface ISecurityService {

  String getLoggedInUsername();

  void autoLogin(String username, String password);
}