import { Camera, Permissions } from 'expo'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Alert,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { 
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { findUPC } from '../actions/index'
import styles from './Styles'

class CameraScreen extends React.Component {

  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    barcodeScanning: false,
    permissionsGranted: false  
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ permissionsGranted: status === 'granted' })
  }

  toggleBarcodeScanning = () => this.setState({ barcodeScanning: !this.state.barcodeScanning })

  onBarCodeRead = code => {
    
    this.setState(
      { barcodeScanning: !this.state.barcodeScanning }
    )
    this.props.findUPC(code.data)
      .then(() => {
        if(this.props.upcExists) {
          Alert.alert(`Barcode found: ${this.props.upc}\nProduct name: ${this.props.productName}`)
        } else {
          Alert.alert(`Barcode: ${code.data.slice(1)} not found in database`)
        }
      })
  }

  renderNoPermissions = () => 
    <View style={styles.noPermissions}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>

  renderBottomBar = () =>
    <View
      style={styles.bottomBar}>
      <View style={{ flex: 10 }}>
         <TouchableOpacity 
          onPress={this.toggleBarcodeScanning}
          style={{ alignSelf: 'center' }}
          >
            <MaterialCommunityIcons name="barcode-scan" size={50} color={this.state.barcodeScanning ? "white" : "#858585" } />
          </TouchableOpacity>
      </View> 
    </View>

  renderCamera = () =>
    (
      <View style={{ flex: 1 }}>
        <Camera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.camera}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
          onMountError={this.handleMountError}
          onBarCodeRead={this.state.barcodeScanning ? this.onBarCodeRead : undefined}
          >
        </Camera>
        {this.renderBottomBar()}
      </View>
    )

  render() {

    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions()
    const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent
    return <View style={styles.container}>{content}</View>
  }
}

const mapStateToProps = state => {
  return {
    upcExists: state.findUPC.upcExists,
    productName: state.findUPC.product_name,
    upc: state.findUPC.upc
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  findUPC
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)

