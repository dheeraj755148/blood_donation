const { user } = require('../models/users')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const generateUniqueID = async () => {
  while (true) {
    const potentialID = uuidv4()

    const existingUser = await user.findOne({ ID: potentialID })

    if (!existingUser) {
      return potentialID
    }
  }
}

const hashedPassword = async (password) => {
  const pass = await bcrypt.hash(password, 2)
  return pass
}

module.exports.login = async (data) => {
  console.log(data)
  //const uniqueUUID = await generateUniqueID()
  try {
    const userData = await user.findOne({ email: data.email })
    if (!userData) {
      return {
        err: true,
        msg: 'User not found',
      }
    }
    const isPasswordValid = await bcrypt.compare(
      data.password,
      userData.password
    )
    if (!isPasswordValid) {
      return {
        err: true,
        msg: 'Password is not valid',
      }
    }
    return {
      err: false,
      msg: userData,
    }
  } catch (err) {
    return {
      err: true,
      msg: err,
    }
  }
}

module.exports.register = async (data) => {
  console.log(data)
  try {
    const uniqueID = await generateUniqueID()
    const hashPass = await hashedPassword(data.password)
    const newUser = new user({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'donor',
      bloodGroup: data.bloodGroup,
      password: hashPass,
      ID: uniqueID,
      address: data.address,
    })
    const createdUser = await newUser.save()
    console.log('Created user: ', createdUser)
    return {
      err: false,
      msg: createdUser,
    }
  } catch (err) {
    return {
      err: true,
      msg: err,
    }
  }
}

module.exports.get_donor = async () => {
  try {
    const donorData = await user.find({ role: 'donor' })
    return {
      err: false,
      msg: donorData,
    }
  } catch (err) {
    return {
      err: true,
      msg: err,
    }
  }
}

module.exports.edit_donor = async (data) => {
  try {
    console.log(data)
    const donorData = await user.findOneAndUpdate(
      { ID: data.ID },
      {
        email: data.email,
        name: data.name,
        phone: data.phone,
        bloodGroup: data.bloodGroup,
        address: data.address,
        is_donated: data.is_donated,
        $push: {
          donation_date: data.donation_date,
          donation_hospital: data.donation_hospital,
        },
      }
    )
    /* const donorData = await user.find({role: 'donor'}) */
    console.log('update: ', donorData)
    return {
      err: false,
      msg: 'Updated successfully',
    }
  } catch (err) {
    return {
      err: true,
      msg: err,
    }
  }
}

module.exports.delete_donor = async(id)=>{
  try{
    await user.deleteOne({ ID: id })
    return {
      err: false,
      msg: 'Deleted successfully',
    }
  }
  catch (err) {
    return {
      err: true,
      msg: err,
    }
  }
}