package br.com.myseries;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}

/*
----Utilizar para servidor standalone(Sem spring-boot:run)
@SpringBootApplication
public class Application extends SpringBootServletInitializer{

}

*/