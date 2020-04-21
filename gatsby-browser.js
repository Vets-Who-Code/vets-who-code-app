exports.onInitialClientRender = () => {
  require('typeface-roboto-slab')
  require('typeface-source-sans-pro')
  require('typeface-lato')
}

exports.onClientEntry = () => {
  const linkedChat = document.createElement('script')
  linkedChat.setAttribute('src', 'https://linked.chat/web/a9LB63')
  document.head.appendChild(linkedChat)
}
