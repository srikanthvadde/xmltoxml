package com.psi.psi_incontro.xmltool.xmltool.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by mrprintedwall on 2/9/16.
 */
@Component
public class AppConfig
{


	@Value("${thread.core.pool.size}")
	private int corePoolSize;

	@Value("${thread.max.pool.size}")
	private int maxPoolSize;

	@Value("${thread.queue.capacity}")
	private int queueCapacity;



	public int getCorePoolSize()
	{
		return corePoolSize;
	}

	public void setCorePoolSize(int corePoolSize)
	{
		this.corePoolSize = corePoolSize;
	}

	public int getMaxPoolSize()
	{
		return maxPoolSize;
	}

	public void setMaxPoolSize(int maxPoolSize)
	{
		this.maxPoolSize = maxPoolSize;
	}

	public int getQueueCapacity()
	{
		return queueCapacity;
	}

	public void setQueueCapacity(int queueCapacity)
	{
		this.queueCapacity = queueCapacity;
	}
}
