import { context, getOctokit } from '@actions/github';

const TOKEN = process.env.GITHUB_TOKEN;

// Botun kullanıcı adı ve avatar URL'si
const BOT_USERNAME = process.env.BOT_USERNAME || 'primebot'; // Botun kullanıcı adı
const BOT_AVATAR_URL = process.env.BOT_AVATAR_URL || 'https://your-avatar-url-here.com'; // Avatar URL'si

async function addComment(type, number, body) {
    const octokit = getOctokit(TOKEN);

    try {
        if (type === 'issue') {
            await octokit.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: number,
                body: body,
                headers: {
                    'x-github-actor': BOT_USERNAME,
                    'x-github-avatar-url': BOT_AVATAR_URL
                }
            });
        } else if (type === 'pr') {
            await octokit.pulls.createReviewComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: number,
                body: body,
                headers: {
                    'x-github-actor': BOT_USERNAME,
                    'x-github-avatar-url': BOT_AVATAR_URL
                }
            });
        }
    } catch (error) {
        console.error(`Failed to add comment to ${type}:`, error);
    }
}

module.exports = {
    addComment
};