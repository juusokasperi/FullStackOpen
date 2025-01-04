import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, StyleSheet, Pressable, View, TouchableWithoutFeedback } from 'react-native';
import Text from '../Text';

import theme from '../../theme';

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000080',
	},
	row: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 20,
		alignItems: 'flex-start',
	},
	modalText: {
		paddingVertical: 10,
	}
  });

const OrderBy = ({onOrderChange, orderBy}) => {
	const [modalVisible, setModalVisible] = useState(false);

	const options = [
		{ label: 'Latest repositories', value: 'CREATED_AT', dir: 'DESC' },
		{ label: 'Highest rated repositories', value: 'RATING_AVERAGE', dir: 'DESC' },
		{ label: 'Lowest rated repositories', value: 'RATING_AVERAGE', dir: 'ASC' }
	]

	const handleModalClose = () => setModalVisible(false);
	const handleOptionSelect = (newOrder) => {
		onOrderChange(newOrder);
		handleModalClose();
	}

	return (
		<>
		<View style={styles.centeredView}>
			<Modal
				animationType="none"
				transparent={true}
				visible={modalVisible}
				onRequestClose={handleModalClose}>
			<TouchableWithoutFeedback onPress={handleModalClose}>
			<View style={styles.overlay}>
				<View style={styles.centeredView}>
				<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
					<View style={styles.modalView}>
						<Text style={styles.modalText} color="textSecondary">Order by...</Text>
						{options.map((option, index) => (
						<Pressable key={index} onPress={() => handleOptionSelect(option)}>
							<Text style={styles.modalText}>{option.label}</Text>
						</Pressable>
						))}
					</View>
				</TouchableWithoutFeedback>
				</View>
			</View>
			</TouchableWithoutFeedback>
			</Modal>
		</View>
			<Pressable
				onPress={() => setModalVisible(true)}>
				<View style={styles.row}>
					<Text color="textSecondary">{orderBy.label}</Text>
					<MaterialIcons name="arrow-drop-down" size={24} color={theme.colors.textSecondary} />
				</View>
			</Pressable>
		</>
	)
}

export default OrderBy;
