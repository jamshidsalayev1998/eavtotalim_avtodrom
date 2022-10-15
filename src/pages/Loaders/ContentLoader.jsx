import ContentLoader from "react-content-loader"

const LoaderForContent = (props) => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={800}
    // height={160}
    // viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ccc"
    {...props}
  >
    <rect x="20%" y="8" rx="3" ry="3" width="60%" height="16" /> 
    <rect x="30%" y="30" rx="3" ry="3" width="40%" height="16" />  
    <rect x="20%" y="52" rx="3" ry="3" width="60%" height="16" /> 
    <rect x="0" y="80" rx="3" ry="3" width="100%" height="14" /> 
    <rect x="0" y="100" rx="3" ry="3" width="100%" height="14" /> 
    <rect x="0" y="120" rx="3" ry="3" width="100%" height="14" /> 
    <rect x="0" y="145" rx="3" ry="3" width="100%" height="70" /> 
    <rect x="0" y="230" rx="3" ry="3" width="100%" height="14" /> 
    <rect x="0" y="255" rx="3" ry="3" width="100%" height="14" /> 
    <rect x="5%" y="280" rx="3" ry="3" width="90%" height="280" /> 
    <rect x="0" y="580" rx="3" ry="3" width="100%" height="14" /> 
    <rect x="0" y="600" rx="3" ry="3" width="100%" height="14" /> 
    <rect x="0" y="620" rx="3" ry="3" width="100%" height="14" /> 
    {/* <circle cx="100" cy="16" r="20" /> */}
  </ContentLoader>
)

export default LoaderForContent;