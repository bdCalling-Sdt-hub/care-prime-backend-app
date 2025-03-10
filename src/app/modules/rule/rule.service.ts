import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiErrors'
import { IRule } from './rule.interface'
import { Rule } from './rule.model'

//privacy policy
const createPrivacyPolicyToDB = async (payload: IRule) => {

    // check if privacy policy exist or not
    const isExistPrivacy = await Rule.findOne({ type: 'privacy' })

    if (isExistPrivacy) {

        // update privacy is exist 
        const result = await Rule.findOneAndUpdate({type: 'privacy'}, {content: payload?.content}, {new: true})
        const message = "Privacy & Policy Updated successfully"
        return { message, result }
    } else {

        // create new if not exist
        const result = await Rule.create({ ...payload, type: 'privacy' })
        const message = "Privacy & Policy Created successfully"
        return {message, result}
    }
}

const getPrivacyPolicyFromDB = async () => {
    const result = await Rule.findOne({ type: 'privacy' })
    return result
}

//terms and conditions
const createTermsAndConditionToDB = async (payload: IRule) => {

    const isExistTerms = await Rule.findOne({ type: 'terms' })
    if (isExistTerms) {
        const result = await Rule.findOneAndUpdate({type: 'terms'}, {content: payload?.content}, {new: true})
        const message = "Terms And Condition Updated successfully"
        return { message, result }
  
    } else {
        const result = await Rule.create({ ...payload, type: 'terms' });
        const message = "Terms And Condition Created Successfully"
        return { message, result }
    }
}

const getTermsAndConditionFromDB = async () => {
    const result = await Rule.findOne({ type: 'terms' })
    
    return result
}

//privacy policy
const createAboutToDB = async (payload: IRule) => {

    const isExistAbout = await Rule.findOne({ type: 'about' })
    if (isExistAbout) {
        const result = await Rule.findOneAndUpdate({type: 'about'}, {content: payload?.content}, {new: true})
        const message = "About Us Updated successfully"
        return { message, result }
    } else {
        const result = await Rule.create({ ...payload, type: 'about' })
        const message = "About Us created successfully"
        return { message, result }
    }
}
  
const getAboutFromDB = async () => {

    const result = await Rule.findOne({ type: 'about' })
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "About doesn't exist!")
    }
    return result
}


//privacy policy
const createDisclaimerToDB = async (payload: IRule) => {

    // check if privacy policy exist or not
    const isExistDisclaimer = await Rule.findOne({ type: 'disclaimer' })

    if (isExistDisclaimer) {
        const result = await Rule.findOneAndUpdate({type: 'disclaimer'}, {content: payload?.content}, {new: true})
        const message = "Disclaimer Updated successfully"
        return { message, result }
    } else {

        // create new if not exist
        const result = await Rule.create({ ...payload, type: 'disclaimer' })
        const message = "Disclaimer Created successfully"
        return {message, result}
    }
}

const getDisclaimerFromDB = async () => {
    const result = await Rule.findOne({ type: 'disclaimer' })
    return result
}

//resources
const createResourcesToDB = async (payload: IRule) => {

    // check if privacy policy exist or not
    const isExistResources = await Rule.findOne({ type: 'resource' })

    if (isExistResources) {
        const result = await Rule.findOneAndUpdate({type: 'resource'}, {content: payload?.content}, {new: true})
        const message = "Resources Updated successfully"
        return { message, result }
    } else {

        // create new if not exist
        const result = await Rule.create({ ...payload, type: 'resource' })
        const message = "Resources Created successfully"
        return {message, result}
    }
}

const getResourcesFromDB = async () => {
    const result = await Rule.findOne({ type: 'resource' })
    return result
}
  
export const RuleService = {
    createPrivacyPolicyToDB,
    getPrivacyPolicyFromDB,
    createTermsAndConditionToDB,
    getTermsAndConditionFromDB,
    createAboutToDB,
    getAboutFromDB,
    createDisclaimerToDB,
    getDisclaimerFromDB,
    createResourcesToDB,
    getResourcesFromDB
}  