const jwt = require('jsonwebtoken')

const sessionTokenValidator = (req) =>{
    const {
        headers: { authorization }
      } = req

      if (!authorization) throw new httpErrors.Unauthorized('You are not allowed')
      const [tokenType, token] = authorization.split(' ')

      if (tokenType !== 'Bearer')
        throw new httpErrors.Unauthorized('You are not allowed')
      
      const payload = jwt.verify(token, process.env.SECRET)
  
      return {payload}
}

const sessionTokenCreator = (email, password) =>{

      const payload = { email, password }
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '2min'
      })

      return { token }
}


module.exports = {sessionTokenValidator, sessionTokenCreator}