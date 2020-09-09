import React,{Component} from 'react'
import { Card, CardTitle, CardBody,CardImg, CardText } from 'reactstrap'

class DishDetail extends Component{
   

RenderDish(dish) 
{
    if(dish!=null)
    {
        return(
        <div key={dish.id} >
            <Card>
                
            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardTitle>

                   <h3>{dish.name}</h3>
                </CardTitle>
                <CardText>
                    {dish.description}
                </CardText>
                
            </Card>




        </div>)
    }
    else{

        return(<div></div>)
    }
}

RenderComments(comments)
{
    if(comments==null)
    {
        return(<div>
            
        </div>)
    }
    const l=comments.comments.map((comment)=>{
         return(
             <div  key={comment.id}>
            
         <p>{comment.comment}</p>
         <p>-- {comment.author},
            &nbsp;
            {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(comment.date))}
            </p>
        
    
        </div>
    )})
    
    return(
        <div>
            <Card border="light">
                <CardTitle><h4>&nbsp;Comments</h4></CardTitle>
    <CardBody>{l}</CardBody>
                
            </Card>
            
        </div>
    )
}
render(){
return (
    <div className="container">
        <div className="row">
          <div  className="col-12 col-md-5 m-1">
            {this.RenderDish(this.props.selectedDish)}
          </div>
          <div  className="col-12 col-md-5 m-1">
              {this.RenderComments(this.props.selectedDish)}
          </div>
        </div>
    </div>
);
  
}}
export default DishDetail;