building process...

As pointed out in this answer by EsterlingAccimeYoutuber, you can use a parser in case you don't want to use dangerouslySetInnerHTML attribute.

By now, react-html-parser has not been updated for 3 years, so I went looking for a different module.

html-react-parser does same job but is frequently maintained and updated.

It should be good practice to sanitize your html-String to prevent XSS attacks. dompurify can be used for that.

I updated EsterlingAccimeYoutuber's code-example to the following:

import React from 'react';
import { render } from 'react-dom';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const SpecialButton = ({ children, color }) => (
<button style={{color}}>{children}</button>
);

const htmlFromCMS = `

<div>Hi, 
  <SpecialButton color="red">My Button</SpecialButton>
</div>`;

const htmlFrom = (htmlString) => {
const cleanHtmlString = DOMPurify.sanitize(htmlString,
{ USE_PROFILES: { html: true } });
const html = parse(cleanHtmlString);
return html;
}

const App = () => (

  <div>
     {htmlFromCMS && htmlFrom(htmlFromCMS)}
  </div>
);

render(<App />, document.getElementById('root'));

<!-- ============= -->

const html = '<div>Hello World</div>';
const reactElement = parse(html);

class HtmlComponent extends React.Component {
render() {
return reactElement;
}
}
