import React,{Component} from 'react';
import { Card, CardTitle,Button, CardBody,Modal,ModalBody,ModalHeader,Label,Col,Row,CardImg, CardText,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';
   
    
function RenderDish({dish}) 
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

function RenderComments({comments,addComment,dishId})
{
    if(comments==null)
    {
        return(<div>
            
        </div>)
    }
    const l=comments.map((comment)=>{
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

        <CommentForm dishId={dishId} addComment={addComment}> 
        </CommentForm>    
            </Card>
            
        </div>
    )
}
const DishDetail=(props)=>{


if(props.dish!=null)
{
return (
    <div className="container">
       <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
<BreadcrumbItem acive>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
<h3>{props.dish.name}</h3>
                    </div>
                </div>
        <div className="row">
          <div  className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish}/>
          </div>
          <div  className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments}
          addComment={props.addComment}
          dishId={props.dish.id}
          />
          </div>
        </div>
    </div>
);}
else{
    return(<div>
        
    </div>)
}
  
}
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {

        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

               
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span>Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row  className="form-group">
                                <Label for="rating" md={12}>Rating</Label>
                                <Col  md={12}>
                                    <Control.select defaultValue="5" model=".rating" id="rating" name="rating" className="form-control" >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author"  md={12}>Your Name</Label>
                                <Col  md={12}>
                                    <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                    <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 charaters or less' }} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="feedback"  md={12}>Your feedback</Label>
                                <Col  md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" resize="none" rows="6" className="form-control" validators={{ required }} />
                                    <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required' }} />
                                </Col>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}
export default DishDetail;