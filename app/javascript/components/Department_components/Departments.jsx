import React from 'react';
import $ from 'jquery';
import '../../styles/Functions/Functions.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';

class Departments extends React.Component {
    departments = [{ name: 'Development', hod: 'Vinitha Shree' }, { name: 'Function 1', hod: 'Suresh Kumar' }];
    // functions = [];
    department = null;
    constructor(props) {
        super(props)
        this.state = {
            departments: []
        };
    }
    componentDidMount() {
        this.getData();
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
            $('.Title').prop('title', 'Hi');
            $('.Title').prop('data-toggle', 'tooltip');
            $('.Title').prop('data-placement', 'top');
        });
    }
    getData=()=>{
        const url = "/api/v1/departments/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                this.setState({ departments: response })
                console.log(this.state.departments);
                this.forceUpdate();
            })
            .catch((err) => console.log(err));
    }
    delete = (e) => {
        const url = "/api/v1/departments/destroy";
        const body = { id: e }
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                console.log(response);
                this.getData();
            })
            .catch(error => console.log(error.message));
    }
    change=(e)=>{
        var name=''
        e.map((val,i)=>{
            val=JSON.parse(val)
            if(i==0)
                name+=val.name;
            else    
                name+=', '+val.name;
        })
        return name
    }
    render() {
        if (this.department != null) {
            // return <AddEmployee employee={this.employee}></AddEmployee>
            return <Redirect to={{ pathname: '/home/department/add', state: { department: this.department } }}></Redirect>
        }
        else
            return (
                <div className="Functions">
                    <div className="row head">
                        <div className="col col-6 title">Departments</div>
                        <div className="col col-6" style={{ justifyContent: 'flex-end' }}>
                            <button className="addfun" onClick={() => this.props.history.push('/home/department/add')}>Add New Department</button>
                        </div>
                    </div>
                    <br />
                    {this.state.departments.length > 0 ?
                        <div className="row header">
                            <div className="col col-3">Department Name</div>
                            <div className="col col-2">HOD</div>
                            <div className="col col-5"></div>
                            <div className="col col-2"></div>
                        </div> : null}
                    <div className="content">
                        {this.state.departments.length > 0 ?
                            this.state.departments.map((person, index) => (
                                <div className="row" key={index.toString()}>
                                    <div className="col col-3">{person.dname}</div>
                                    <div className="col col-4">{this.change(person.rmngr)}</div>
                                    <div className="col col-3 edit"><span className="Edit" onClick={() => {
                                        this.department = person;
                                        this.forceUpdate();
                                    }}><FontAwesomeIcon icon={faEdit} /></span></div>
                                    <div className="col col-2"><span className="delete" onClick={() => this.delete(person.id)}><FontAwesomeIcon icon={faTrash} /></span></div>
                                </div>
                            )) :
                            <div className="emptyFuns">
                                <img src="http://159.65.156.91/static/media/page-empty.89ace62a.svg" alt="" />
                                <h5>No Data Found</h5>
                            </div>
                        }
                    </div>
                    <br />
                    {this.state.departments.length > 0 ?
                        <div>
                            <div className="pages">
                                <button className="left btn btn-light">{'<'}</button>
                                <button className="num btn btn-light">1</button>
                                <button className="right btn btn-light">{'>'}</button>
                            </div>
                            <div className="goto">
                                <span>Goto</span><input className="form-control" type="numbers" name="" />
                            </div>
                        </div>
                        : null
                    }
                </div>
            );
    }
}

export default Departments;