import { getAccessToken, getLinearTeams } from "../../services/lib/linear.service.js";

export const getAccessTokenController = async (req, res, next) => {
    const { code } = req.query;
    const workspace = res.locals.workspace;
    if (!code) {
        return res
            .status(400)
            .json({ error: "Authorization code or user information is missing." });
    }
    try {
        const accessToken = await getAccessToken(code, workspace);

        res.status(200).json({
            accessToken
        });
    } catch (err) {
        next(err);
    }
};

export const getLinearTeamsController = async (req, res, next) => {
    const linearToken = req.headers.lineartoken;
    const teams = await getLinearTeams(linearToken);
    res.status(200).json({
        teams
    });
}