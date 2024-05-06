import db from "../Database/Models";
import bcrypt from "bcrypt";

export const serviceLoginUser = async (input) => {
	const { email, password } = input;
	try {
		const user = await getUserByEmail(email)
		const matchPassword = await bcrypt.compare(password, user.password);
		if (!matchPassword) {
			throw { code: 401, message: "Password is incorrect" };
		}

		return user;
	} catch (error: any) {
		if (error.code) {
			throw { code: error.code, message: error.message };
		} else {
			throw { code: 500, message: "Internal Server Error" };
		}
	}
};

export const getUserByEmail = async (email) => {
  try {
    const user = await db.users.findOne({ where: { email } });

    if (!user) {
        throw {
          code: 404,
          message: "User with this Email/Username doesn't exist",
        };
    }

    return user;
  } catch (error) {
    throw { code: 500, message: "Internal Server Error" };
  }
};

export const getUserById = async (id) => {
  try {
    const user = await db.users.findOne({ where: { id } });

    if (!user) {
      throw {
        code: 404,
        message: "User with this ID doesn't exist",
      };
    }

    return user;
  } catch (error) {
    throw { code: 500, message: "Internal Server Error" };
  }
};

export const serviceCreateUser = async (input) => {
  const { first_name, last_name, birth_date, email, password } = input;

  try {
    const existingEmail = await db.users.findOne({ where: { email } });
    if (existingEmail) {
      throw { code: 409, message: "You already have an account. Please log in." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.users.create({
      email,
      password: hashedPassword,
      birth_date: birth_date.split('T')[0],
      first_name,
      last_name,
    });

    return newUser;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const serviceChangePassword = async (input ,sessionUser): Promise<boolean> => {
  try {
    const { currentPassword, newPassword } = input;
    const user = await db.users.findOne({
      where: { id: sessionUser.id },
    });

    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (!matchPassword) {
      throw { code: 401, message: "Password is incorrect" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.users.update(
      { password: hashedPassword },
      { where: { id: user.id } }
    );

    return true;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};


export const serviceGetUserDetails = async (sessionUser) => {
  try {
    const user = await db.users.findOne({ where: { id: sessionUser.id } });
    return user;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const serviceUpdateUserDetails = async ( input, sessionUser): Promise<boolean> => {
  try {
    const { first_name, last_name, email, mobile, birth_date } = input;
    const existingUser = await db.users.findOne({ email });

    if(existingUser && existingUser.id  !== sessionUser.id){
      console.log(existingUser.id, sessionUser.id)
      throw {code: 500, message:"user with this email is already exist"};
    }else if (existingUser.id  === sessionUser.id){
      await db.users.update(
        { first_name, last_name, mobile, birth_date },
        { where: { id: sessionUser.id } }
      );
    }else{
      await db.users.update(
        { first_name, last_name, email, mobile, birth_date },
        { where: { id: sessionUser.id } }
      );
    }

    return true;
  } catch (error: any) {
    console.error(error)
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const serviceDeleteUserAccount = async (sessionUser): Promise<boolean> => {
  try {
    const user = await db.users.destroy({ where: { id: sessionUser.id } });
    return true;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const serviceGetUsersDetails = async () => {
  try {
    const users = await db.users.findAll();
    return users;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};
