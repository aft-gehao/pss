package com.afanti.psi.sms;

import com.afanti.psi.sms.MessageService;
import com.afanti.psi.sms.SpringContextHolder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AftException extends RuntimeException
{
  private static final long serialVersionUID = 1L;
  private static final Logger LOGGER = LoggerFactory.getLogger(AftException.class);
  private final String errorCode;
  private final String message;
  private Object[] args;

  public AftException(int errorCode)
  {
    this.errorCode = String.valueOf(errorCode);
    this.message = ((MessageService)SpringContextHolder.getBeanByType(MessageService.class)).getMessage(this.errorCode);
    LOGGER.error("系统内部自定义异常，错误码[{}]消息[{}]", Integer.valueOf(errorCode), this.message);
  }

  public AftException(int errorCode, Object[] args)
  {
    this.errorCode = String.valueOf(errorCode);
    this.args = ((Object[])args.clone());
    this.message = ((MessageService)SpringContextHolder.getBeanByType(MessageService.class)).getMessageDef(this.errorCode, args, "");
    LOGGER.error("系统内部自定义异常，错误码[{}]消息[{}]", Integer.valueOf(errorCode), this.message);
  }

  public AftException(int errorCode, Throwable cause)
  {
    super(cause);
    this.errorCode = String.valueOf(errorCode);
    this.message = ((MessageService)SpringContextHolder.getBeanByType(MessageService.class)).getMessage(this.errorCode);
    LOGGER.error("系统内部异常，错误码[{}]原异常信息[{}]", new Object[] { Integer.valueOf(errorCode), cause.getMessage() });
  }

  public AftException(int errorCode, Throwable cause, Object[] args)
  {
    super(cause);
    this.errorCode = String.valueOf(errorCode);
    this.args = ((Object[])args.clone());
    this.message = ((MessageService)SpringContextHolder.getBeanByType(MessageService.class)).getMessageDef(this.errorCode, args, "");
    LOGGER.error("系统内部异常，错误码[{}]消息[{}]原异常信息[{}]", new Object[] { Integer.valueOf(errorCode), this.message, cause.getMessage() });
  }

  public AftException(String message)
  {
    this.errorCode = "";
    this.message = message;
    LOGGER.error("系统内部异常，消息[{}]", this.message);
  }

  public AftException(String message, Throwable cause) {
    super(cause);
    this.errorCode = "";
    this.message = message;
    LOGGER.error("系统内部异常，消息[{}]", this.message);
  }

  public AftException(Throwable cause) {
    super(cause);
    this.errorCode = "";
    if (super.getMessage() != null)
      this.message = super.getMessage();
    else if (cause != null)
      this.message = cause.toString();
    else {
      this.message = "";
    }
    LOGGER.error("系统内部异常，消息[{}]", this.message);
  }

  public String getMessage()
  {
    return this.message;
  }

  public String getErrorCode()
  {
    return this.errorCode;
  }

  public Object[] getArgs()
  {
    return (Object[])this.args.clone();
  }
}