const { expect } = require('@playwright/test');

const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Log in' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Create blog' }).click()
    await expect(page.getByText('Create new')).toBeVisible()
    await page.getByTestId('blogTitle').fill(title)
    await page.getByTestId('blogAuthor').fill(author)
    await page.getByTestId('blogUrl').fill(url)
    await page.getByRole('button', { name: 'Submit'}).click()
    await page.waitForTimeout(1000);
    await page.getByText(`${title} by ${author}`).first()
}

const likeBlog = async (page, title, author) => {
    const blogElement = await page.getByText(`${title} by ${author}`).first();
    await blogElement.getByRole('button', { name: 'view' }).click()
    await page.waitForTimeout(1000);
    await page.getByText(`${title} by ${author} hide`).getByRole('button', { name: 'like' }).click()
    await page.getByText(`${title} by ${author} hide`).getByRole('button', { name: 'hide' }).click()
}

export { loginWith, createBlog, likeBlog }
