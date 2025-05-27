import React from 'react';

interface NewPostTemplateProps {
  title: string;
  slug: string;
}

export default function NewPostTemplate({ title, slug }: NewPostTemplateProps) {
  return (
    <div>
      <h1>Nuevo post: {title}</h1>
      <a href={slug}>Link</a>
    </div>
  );
}
