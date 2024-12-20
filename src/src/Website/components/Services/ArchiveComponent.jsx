const ArchiveComponent = ({ dataType, archivedData }) => {
  let dataToDisplay = [];

  // Filter archived data based on dataType
  if (dataType === "link") {
    dataToDisplay = archivedData.filter(item => item.type === "link");
  } else if (dataType === "report") {
    dataToDisplay = archivedData.filter(item => item.type === "report");
  } else if (dataType === "tender") {
    dataToDisplay = archivedData.filter(item => item.type === "tender");
  } else if (dataType === "whatsnew") {
    dataToDisplay = archivedData.filter(item => item.type === "whatsnew");
  }

  return (
    <div>
   
      <ul>
        {dataToDisplay.map(i => (
          <li key={i.u_id}>
          <div className="newsbox">
            <div className="latest-news-date">
              <p className="news-sec-datep">
                {i.u_startdate}{" "}
              </p>
            </div>
            <div className="ml-10">
              <p className="news-p">
                <a
                  href={i.link}
                  target={i.target}
                  title={i.titleAttribute}
                >
                  {i.u_report_tittle}
                </a>
              </p>
            </div>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchiveComponent;
