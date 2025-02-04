import { getAllIssues, getIssue, updateIssue, getCurrentCycleIssue, getTeamCurrentCycleIssues } from "../../services/lib/issue.service.js"
import { getWorkspaceProfile } from "../../services/lib/workspace.service.js"

export const getAllIssuesController = async (req, res, next) => {
   try {
    const workspace = res.locals.workspace
    const { team } = req.params
    const issues = await getAllIssues(workspace, team)
    res.status(200).json({ issues })
   } catch (err) {
    next(err)
   }
}

export const getIssueController = async (req, res, next) => {
   try {
    const workspace = res.locals.workspace
    const { team, issue:id } = req.params
    const issue = await getIssue(workspace, team, id)
    res.status(200).json({ issue })
   } catch (err) {
    next(err)
   }
}

export const updateIssueController = async (req, res, next) => { 
    try {
        const workspace = res.locals.workspace
        const { team, issue:id } = req.params
        const updateData = req.body
        const issue = await updateIssue(workspace, team, id, updateData)
        res.status(200).json({ issue })
    } catch (err) {
        next(err)
    }
}

export const getCurrentCycleIssueController = async (req, res, next) => {
    try {
        const workspace = res.locals.workspace
        const { team } = req.params
        const cycle = await getCurrentCycleIssue(workspace, team)
        res.status(200).json({ cycle })
    } catch (err) {
        next(err)
    }
}

export const getTeamCurrentCycleIssuesController = async (req, res, next) => {
    try {
        const workspace = res.locals.workspace
        const { team } = req.params
        const issues = await getTeamCurrentCycleIssues(workspace, team)
        res.status(200).json({ issues })
    } catch (err) {
        next(err)
    }
}

export const getPublicTeamCurrentCycleIssuesController = async ( req,res,next ) =>{
    try {
        const { workspace:slug }= req.params
        const workspace = await getWorkspaceProfile(slug)
        const issues = await getTeamCurrentCycleIssues(workspace, workspace.teams[0]._id)
        res.status(200).json({ issues })
    } catch (err) {
        next(err)
    }
}

export const getAllPublicIssuesController = async (req,res,next) =>{
    try {
        const { workspace:slug }= req.params
        const workspace = await getWorkspaceProfile(slug)
        const issues = await getAllIssues(workspace, workspace.teams[0]._id);
        res.status(200).json({ issues })
    } catch (err) {
        next(err)
    }
}