import React from 'react'
import {graphql} from 'react-apollo'
import {SIGNUP_MUTATION} from '../../mutations/user'
import InputMask from 'react-input-mask'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'
import {Link} from 'react-router-dom'
 
class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            timer : this.props.timer,
            isCompleted : false           
        }        
        this.decrement = props.decrement
        this.after = props.after
        this.prepend = props.prepend
        this.append = props.append
    }
    tick(){
        
        this.setState((prevState,props)=>({
            timer : prevState.timer - props.decrement
        }))
        
        if(this.state.timer == 0){
            clearInterval(this.timerID);
            this.setState({"isCompleted":true})
        }            
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);        
    }
    
    render(){
        const date = (new Date(this.state.timer * 1000))
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if(seconds < 10){
            seconds = "0" + seconds
        }
        if(minutes < 10){
            minutes = "0" + minutes
        }
        let result = []
        if(this.prepend){
            result.push(this.prepend)
        }
        
        this.state.isCompleted && this.after
            ? result = this.after
            : result.push(<div>{minutes + ":" + seconds}</div>)
        if(this.append){
            result.push(this.append)
        }
        return(      
            <div>{result}</div>     
        )            
    }
}

class SignupForm extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          password: '',
          password_repeat:'',
          fullname: '',
          phone:'',
          isCorrect:true,
          enableConfirm:false  
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
      }

     
    onSubmit(e) {
        e.preventDefault()
        const { email, password, fullname, phone, password_repeat } = this.state
        if(password_repeat === password){
            var regex = new RegExp(/[^\d]/g)
            let phoneFormatted = 123123
            this.props.signup({ email, password, fullname, phone:phoneFormatted},()=>{this.setState({"isCorrect" : false})})
        }
    }
    
    onClick(e){
        e.preventDefault()
        if(e.currentTarget.name == "show"){
            this.setState({
                "enableConfirm" : true
            })                
        }
        else{
            this.setState({
                "enableConfirm" : false
            })
        }        
    }

    onChange(e){
        let value = e.target.value
        let name = e.target.name
        let correct = true
        switch(name){
            case "password_repeat":
            correct  = this.matchPassword(this.state.password, value)
            break
            case "email":
            correct = this.checkEmail(value)
            break
            case "phone":
            correct = this.checkPhone(value)
            break
        }  
        if(value.length && correct){
            $(e.currentTarget).closest(".form-group").removeClass("has-error").addClass("has-success")  
        } 
        else{
            value = ""
            $(e.currentTarget).closest(".form-group").removeClass("has-success").addClass("has-error")
        }          
        this.setState(
            {[name]: value}
        )    
    }
    
    matchPassword(origin, repeat){
        return repeat === origin
    }

    checkPhone(phone){
        const digits = phone.match(/\d/g)
        let length = 0
        length = digits && digits.length
        return length > 10;    
    }

    checkEmail(email){
        const matchedEmail = email.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/g)
        return matchedEmail && matchedEmail.length    
    }
    
    sendBtnText = (<span className="control-label">Нажмите <b>Отправить</b> для верификации номера</span> )
    smsConfirmField = (<Timer timer={180} decrement={1}/>)
    
    render() {        
        return (
            <form onSubmit={this.onSubmit} className="signup-form">
                <div className="form-group row has-feedback">
                    <label htmlFor="fullname" className="col-sm-2 col-form-label control-label">ФИО</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="fullname" name="fullname" placeholder="Введите ФИО" onChange={this.onChange} aria-describedby="inputSuccess2Status" required/>
                        {
                            this.state.fullname != "" && 
                            <span className="glyphicon glyphicon-ok form-control-feedback" style={{position:'absolute', right:'12px'}} aria-hidden="true"></span>
                        }                    
                    </div>
                </div>        
                

                <div className="form-group row">
                    <label htmlFor="phone" className="col-sm-2 col-form-label control-label">Номер телефона</label>
                    <div className="col-sm-7">
                        <InputMask name="phone" mask="+7(999)999-99-99" className="form-control phone" required placeholder="Введите номер телефона" maskChar="•" disabled={this.state.enableConfirm}  onChange={this.onChange}></InputMask>
                        {!this.state.enableConfirm && this.sendBtnText}              
                        
                    </div>

                    <span className="col-sm-3 col-sm-offset-0">
                        {!this.state.enableConfirm 
                            ? (<button type="button" className="btn btn-submit" name="show" disabled={this.state.phone == ""} onClick={this.onClick}>Отправить</button>)
                            : (<span className="glyphicon glyphicon-remove" name="hide" aria-hidden="true" title="Изменить номер" onClick={this.onClick}></span>)    
                        }
                        
                    </span>             
                                        
                </div>            
                
                {this.state.enableConfirm && 
                    <div className="form-group row">
                        <label htmlFor="phone" className="col-sm-3 col-sm-offset-2 col-form-label">Код с SMS:</label>
                        <div className="col-sm-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="SMS code"/>  
                                <div className="input-group-btn">
                                    <button type="button" className="form-control btn btn-submit">OK</button>                            
                                </div>                      
                            </div>                        
                        </div>                                            
                        
                        <div className="col-sm-2">                        
                            {this.state.enableConfirm 
                                && <Timer 
                                    timer={180} 
                                    decrement={1} 
                                    prepend={<span>Отправка через:</span>} 
                                    after={<button type="button" 
                                    onClick={(e)=>{console.log("clicked resend :", e)}} 
                                    className="form-control btn btn-default">Отправить снова</button>}/>
                                }
                        </div>
                    </div>
                }

                <div className="form-group row has-feedback">
                    <label htmlFor="email" className="col-sm-2 col-form-label control-label">Почта</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onChange} required/>
                        {
                        this.state.email != "" && 
                        <span className="glyphicon glyphicon-ok form-control-feedback" style={{position:'absolute', right:'12px'}} aria-hidden="true"></span>
                        }
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-2 col-form-label control-label">Пароль</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" placeholder="Введите пароль" onChange={this.onChange} required/>
                    </div>
                </div>
                <div className="form-group row has-feedback">
                    <label htmlFor="password_repeat" className="col-sm-2 col-form-label control-label">Повторите пароль</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control"  name="password_repeat" placeholder="Повторите ваш пароль" onChange={this.onChange} required/>
                        {
                            this.state.password_repeat != "" && 
                            <span className="glyphicon glyphicon-ok form-control-feedback" style={{position:'absolute', right:'12px'}} aria-hidden="true"></span>
                        } 
                    </div>
                </div>
                {!this.state.isCorrect && <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        <strong>Аккаунт уже существует.</strong>
                        <Link to={`recover`} class="alert-link">Забыли пароль ?</Link>
                    </div>          
                </div>}
                <div className="form-group row">
                    <div className="text-center">
                        <button type="submit" className="btn btn-submit">Зарегистрироваться</button>
                    </div>
                </div>
            </form>
        )
    }
}



const withMutation = graphql( SIGNUP_MUTATION, {
    props: ({ mutate, ownProps: { history} }) => ({
      async signup({email, password, fullname, phone}, callback) {
        try{
            const result = await mutate({
                variables: { input: { email, password, fullname, phone } },
            })
            if (result) {          
                history.push('/')
            }
        }
        catch(e){
            callback()        
        }        
      }
    })
  })

export default withRouter(withMutation(SignupForm))