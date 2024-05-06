import { serviceChangePassword, serviceCreateUser, serviceDeleteUserAccount, serviceGetUserDetails, serviceGetUsersDetails, serviceLoginUser, serviceUpdateUserDetails } from "../Services/userService";
import { changePasswordSchema, createUserSchema, loginSchema, updateUserSchema } from "../Validators/userSchema";

export const loginUser = async (req: any, res: any) => {
  try {
    
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await serviceLoginUser(value);

    req.session.user = user
    res.status(200).json({session: req.session});

  } catch (error: any) {
    const statusCode = error.code || 500;
    console.log(error.message)
    res.status(statusCode).json({ error: error.message });
  }
}

export const createUser = async (req: any, res: any) => { 
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    console.log(value)
    const user = await serviceCreateUser(value);
    res.status(201).json(user);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const logoutUser = async (req: any, res: any) => {
  try {
    await req.session.destroy();
    res.status(200).json(true);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const changePassword = async (req: any, res: any) => {
  const { error, value } = changePasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const result = await serviceChangePassword(value, req.session.user);
    await req.session.destroy();
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const getUserDetails = async (req: any, res: any) => {
  try {
    const result = await serviceGetUserDetails(req.session.user);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  console.log(req.params.id)
  const { error, value } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const result = await serviceUpdateUserDetails(value, req.session.user);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const result = await serviceDeleteUserAccount(req.session.user);
    await req.session.destroy();
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const getUsersDetails = async (req: any, res: any) => {
  try {
    const result = await serviceGetUsersDetails();
    res.status(200).json(result);

  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};
