import React from 'react'

function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Rishabh's Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            Welcome to my personal blogging website, this website is the part of my portfolio projects for
            Full Stack Web Development and blogging my learnings along the way. I am passionate to learn new techs 
            and code. 
            </p>

            <p>
              On this blog, you'll find weekly articles on topics
              such as web development, software engineering, and programming
              languages. Software Engineering is all about daily 
              learning and implementation of what you learned, so keep on checking the blog for new content.
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About