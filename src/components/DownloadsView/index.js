import * as R from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "react-styled-flexboxgrid";
import styled from "styled-components";
import elevationMixin from "../../mixin/elevation";
import { downloadsItemsSelector } from "../../modules/downloads/selectors";
import colors from "../../theme/colors";
import DownloadRow from "./DownloadRow";
import { removeDownload } from "../../modules/downloads/action-creators";

const Body = styled(Col)`
  width: 100%;

  background-color: ${colors.white};
  max-height: 400px;
  height: 300px;

  overflow-y: scroll;
  ${elevationMixin(4)};
`;

class DownloadsView extends Component {
  render() {
    const { downloads, removeDownload } = this.props;
    return (
      <Body>
        {R.reverse(Object.values(downloads)).map((download, idx) => (
          <DownloadRow
            key={download.id}
            download={download}
            pos={idx + 1}
            removeDownload={removeDownload}
          />
        ))}
      </Body>
    );
  }
}

const mapStateToProps = state => ({
  downloads: downloadsItemsSelector(state)
});
const mapDispatchToProps = dispatch => ({
  removeDownload: downloadId => dispatch(removeDownload(downloadId))
});
export default connect(mapStateToProps, mapDispatchToProps)(DownloadsView);
