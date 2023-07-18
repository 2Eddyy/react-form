import React, { useRef, useState } from 'react';
import './Form.css'
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Form = () => {
    const { register, formState: { errors }, handleSubmit, watch, control } = useForm();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmpassword: "",
        degree: ""
    })

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data) => {
        setShow(true)
        console.log(data);
        formData.name = data.name;
        formData.mobile = data.mobile;
        formData.email = data.email;
        formData.password = data.password;
        formData.confirmpassword = data.confirmpass;
        formData.degree = data.degree.value;

    }

    const handleClose = () => setShow(false);


    return (
        <div className='form'>
            <div className="login mt-3">
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)} className='m-3'>
                        <h2 className='text-center mb-3'>Form Validation</h2>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 mt-2'>
                                    <label> Name  </label>
                                </div>
                                <div className='col-6 mt-2'>
                                    <input
                                        {...register("name", { required: true })}
                                        aria-invalid={errors.name ? "true" : "false"}
                                        className='form-control'
                                    />
                                    {errors.name?.type === 'required' && <p role="alert" className='text-danger'>First name is required</p>}
                                </div>
                                <div className='col-6 mt-2'>
                                    <label> Mobile  </label>
                                </div>
                                <div className='col-6 mt-2'>
                                    <input name='mobile' type='number'
                                        {...register("mobile", {
                                            required: "Mobile number is requierd",
                                            minLength: {
                                                value: 10,
                                                message: "minimum number 10"
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: "maximum number 10"
                                            },

                                        })}
                                        className='form-control'
                                    />
                                    {errors.mobile && (<p className='text-danger'>{errors.mobile.message}</p>)}
                                </div>

                                <div className='col-6 mt-2'>
                                    <label> Email  </label>
                                </div>
                                <div className='col-6 mt-2'>
                                    <input name='email'
                                        {...register("email", {
                                            required: "Email Address is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className='form-control'
                                    />
                                    {errors.email && (<p className='text-danger'>{errors.email.message}</p>)}
                                </div>

                                <div className='col-6 mt-2'>
                                    <label> Password  </label>
                                </div>
                                <div className='col-6 mt-2'>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: "Password is required",
                                            validate: (value) => {
                                                return (
                                                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                                        pattern.test(value)
                                                    ) || "(should contain at least 1 special case character (like @#$), 4 numbers, 2 capital case letters and 2 small case letters)."
                                                );
                                            },

                                        })}
                                        className='form-control'
                                    />
                                    {errors.password && (<p className='text-danger'>{errors.password.message}</p>)}
                                </div>
                                <div className='col-6 mt-2'>
                                    <label> Re-enter Password  </label>
                                </div>

                                <div className='col-6 mt-2'>
                                    <input name='confirmpass'
                                        // type='password'
                                        {...register("confirmpass", {
                                            required: "Confirm-Password is required",
                                            validate: value =>
                                                value === password.current || "The passwords do not match"
                                        })}
                                        className='form-control'
                                    />
                                    {errors.confirmpass && (<p className='text-danger'>{errors.confirmpass.message}</p>)}
                                </div>

                                <div className='col-6 mt-2'>
                                    <label> Degree  </label>
                                </div>
                                <div className='col-6 mt-2'>
                                    <Controller
                                        name="degree"
                                        control={control}
                                        rules={{ required: 'Please select degree' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={[
                                                    { value: 'BE', label: 'BE' },
                                                    { value: 'ARTS', label: 'ARTS' },
                                                    { value: 'MBA', label: 'MBA' }
                                                ]}
                                            />
                                        )}
                                    />
                                    {errors.degree && <p className='text-danger'>{errors.degree.message}</p>}
                                </div>
                                <div className='mt-3'>
                                    <label>  <span className="gender">Gender  </span>
                                        <Controller
                                            name="genders"
                                            control={control}
                                            rules={{ required: 'Please select a gender' }}
                                            defaultValue={false}
                                            render={({ field }) => (
                                                <>
                                                    <input type="radio" value="male" {...field} />
                                                    <span className='genders'>Male</span>
                                                    <input type="radio" value="female" {...field} />
                                                    <span className='genders' >Female</span>
                                                </>
                                            )}
                                        />
                                    </label>
                                    {errors.genders && <p className='text-danger'>{errors.genders.message}</p>}
                                </div>
                                <div className='mt-3'>
                                    <label>
                                        <Controller
                                            name="acceptedTerms"
                                            control={control}
                                            rules={{ required: 'Please accept the terms and conditions' }}
                                            defaultValue={false}
                                            render={({ field }) => (
                                                <input type="checkbox" {...field} />
                                            )}
                                        />
                                        <span className='mx-3'> Accept Terms and Conditions</span>
                                    </label>
                                    {errors.acceptedTerms && <p className='text-danger'>{errors.acceptedTerms.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='text-end mt-3'>
                            <input type='submit' value="Submit" className='btn btn-primary' />
                        </div>
                    </form>
                </div>
            </div>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Datas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 fw-bold' >
                                    <label>Name  </label>
                                </div>
                                <div className='col-6'>
                                    <p>{formData.name}</p>
                                </div>
                                <div className='col-6 fw-bold'>
                                    <label>Mobile Number  </label>
                                </div>
                                <div className='col-6'>
                                    <p>{formData.mobile}</p>
                                </div>
                                <div className='col-6 fw-bold'>
                                    <label>Email  </label>
                                </div>
                                <div className='col-6'>
                                    <p>{formData.email}</p>
                                </div>
                                <div className='col-6 fw-bold'>
                                    <label>Password  </label>
                                </div>
                                <div className='col-6'>
                                    <p>{formData.password}</p>
                                </div>
                                <div className='col-6 fw-bold'>
                                    <label>confirmpassword  </label>
                                </div>
                                <div className='col-6'>
                                    <p>{formData.confirmpassword}</p>
                                </div>
                                <div className='col-6 fw-bold'>
                                    <label>Degree  </label>
                                </div>
                                <div className='col-6'>
                                    <p>{formData.degree}</p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default Form;