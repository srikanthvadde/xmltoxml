package com.psi.psi_incontro.xmltool.xmltool.config;

import nz.net.ultraq.thymeleaf.LayoutDialect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Configuration
public class WebConfig implements Filter,WebMvcConfigurer
{


	@Autowired
	AppConfig appConfig;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry)
	{
		registry.addResourceHandler(
				"/webjars/**",
				"/images/**",
				"/css/**",
				"/fonts/**",
				"/js/**",
				"/vendors/**").addResourceLocations(
				"classpath:/META-INF/resources/webjars/",
				"classpath:/static/images/",
				"classpath:/static/fonts/",
				"classpath:/static/css/",
				"classpath:/static/js/",
				"classpath:/static/vendors/"
		);
	}

	@Bean
	public LayoutDialect layoutDialect()
	{
		return new LayoutDialect();
	}

	@Override
	public void configureAsyncSupport(AsyncSupportConfigurer configurer)
	{
		configurer.setTaskExecutor(getTaskExecutor());
	}

	@Primary
	@Bean
	protected ThreadPoolTaskExecutor getTaskExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(appConfig.getCorePoolSize());
		executor.setMaxPoolSize(appConfig.getMaxPoolSize());
		executor.setQueueCapacity(appConfig.getQueueCapacity());
		executor.setWaitForTasksToCompleteOnShutdown(true);
		executor.setThreadNamePrefix("PHOENIX_TASK_EXECUTOR_THREAD");
		executor.initialize();
		return executor;
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**");
	}

   @Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
		HttpServletResponse response = (HttpServletResponse) res;
		HttpServletRequest request = (HttpServletRequest) req;
		System.out.println("WebConfig; "+request.getRequestURI());
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Expose-Headers", "Authorization");
		response.addHeader("Access-Control-Expose-Headers", "responseType");
		response.addHeader("Access-Control-Expose-Headers", "observe");
		System.out.println("Request Method: "+request.getMethod());
		if (!(request.getMethod().equalsIgnoreCase("OPTIONS"))) {
			try {
				chain.doFilter(req, res);
			} catch(Exception e) {
				e.printStackTrace();
			}
		} else {
			System.out.println("Pre-flight");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT");
			response.setHeader("Access-Control-Max-Age", "3600");
			response.setHeader("Access-Control-Allow-Headers", "Access-Control-Expose-Headers"+"Authorization, content-type," +
					"USERID"+"ROLE"+
					"access-control-request-headers,access-control-request-method,accept,origin,authorization,x-requested-with,responseType,observe");
			response.setStatus(HttpServletResponse.SC_OK);
		}

	}



}