import React from 'react'
import logo from '../../../assets/images/logo.svg';
import { useForm } from "react-hook-form"
import { Link, useSubmit, useNavigation } from 'react-router-dom';

import { httpService } from '../../../core/http-service';
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const submitForm = useSubmit()

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    submitForm(userData, { method: "post" });
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">پلتفرم آموزش آنلاین</h1>
        <p className="lead">
          جهت استفاده ازویژگی های پلتفرم آموزش آنلاین کلاسبن ثبت نام کنید
        </p>
        <p className="lead">
          قبلا ثبت نام کرده اید؟
          <Link to="/login" className="me-2">وارد شوید</Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">موبایل</label>
                <input {...register('mobile', {
                  required: 'موبایل الزامی است',
                  minLength: 11,
                  maxLength: 11
                })} className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`} />
                {
                  errors.mobile && errors.mobile.type === 'required' && (
                    <p className='text-danger small fw-bold mt-1'>
                      {errors.mobile?.message}
                    </p>
                  )}
                {
                  errors.mobile && (errors.mobile.type === 'minLength' || errors.mobile.type === 'maxLength') && (
                    <p className='text-danger small fw-bold mt-1'>
                      موبایل باید 11 رقم باشد
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">رمز عبور</label>
                <input
                  {...register('password', { required: 'رمز عبور الزامی است' })}
                  className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                  type="password"
                />
                {
                  errors.password && errors.password.type === 'required' && (
                    <p className='text-danger small fw-bold mt-1'>
                      {errors.password?.message}
                    </p>
                  )
                }
              </div>
              <div className="mb-3">
                <label className="form-label">تکرار رمز عبور</label>
                <input {...register('confirmPassword', {
                  required: 'تکرار رمز عبور الزامی است',
                  validate: value => {
                    if (watch('password') !== value) {
                      return 'عدم تطابق با رمز وارد شده'
                    }
                  }
                })}
                  className={`form-control form-control-lg ${errors.confirmPassword && 'is-invalid'}`}
                  type="password"
                />
                {
                  errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                    <p className='text-danger small fw-bold mt-1'>
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                {
                  errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                    <p className='text-danger small fw-bold mt-1'>
                      {errors.confirmPassword?.message}
                    </p>
                  )
                }
              </div>
              <div className="text-center mt-3">
                <button type="submit" disabled={isSubmitting} className="btn btn-lg btn-primary">
                {isSubmitting ? 'در حال انجام عملیات' : 'ثبت نام کنید'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data)
  const response = await httpService.post("/Users", data);
  return response.status === 200;
}

export default Register