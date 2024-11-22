import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert
} from 'react-native';
import { 
  Button, 
  Text, 
  DataTable, 
  List,
  IconButton
} from 'react-native-paper';


import { useRouter } from 'expo-router';
import { connection } from '../config/config.json';

import SearchModal from '../components/modals/SearchModal';
import NewProduct from '../components/modals/NewProduct';
import EditProductModal from '../components/modals/EditProduct';
import SalesReportModal from '../components/modals/SalesReport';
import ShowError from '../components/ShowError';
import { withTimeout } from '../components/WithTimeout';
import LoadingIndicator from '../components/LoadingIndicator';
import LoadingIndicatorSmall from '../components/LoadingIndicatorSmall';
import ErrorBoundary from '../components/ErrorBoundary';
import DeleteConfirmationModal from '../components/modals/ConfirmationModal';
import ReportConfirmationModal from '../components/modals/ConfirmationModal';
import styles from '../styles/posStyles';

const Manager = () => {
  const router = useRouter();
  
  //Sorting
  const headers = ["Name", "Price", "Category"];
  function sortBy(title) {
    let sortedData = [...products];
    switch (title) {
      case "Name":
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Price":
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case "Category":
        sortedData.sort((a, b) => a.course.localeCompare(b.course));
        break;
      default:
        break;
    }
    setProducts(sortedData);
  }

  // Search product modal 
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  // New product modal 
  const [newProductModalVisible, setNewProductModalVisible] = useState(false);

  // Delete product modal
  const [viewDeleteConfirmationModal, setViewDeleteConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Undefined');
  const [modalBody, setModalBody] = useState('Undefined');

  //Edit product modal
  const [viewEditProductModel, setViewEditProductModal] = useState(false);

  const Separator = () => <View style={styles.separator} />;
  
  //Get all products
  const [products, setProducts] = useState([]); 
  const [productsLoading, setProductsLoading] = useState(false);
  async function populateProducts() {
    setProductsLoading(true);
    if (!connection) {
      ShowError('Connection configuration is missing');
      setProductsLoading(false); 
      return;
    }
    try {
      const response = await withTimeout(fetch(`${connection}/products`, { method: 'GET' }), 5000);
      if (!response.ok) {
        const error = await response.json();
        const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
        setProductsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.msg)) {
        setProducts(data.msg);
        populateOptions();
      } else {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'No products found';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
      }
    } catch (err) {
      console.error('Search error:', err);
      ShowError('There was a problem retrieving products. Please check your network connection');
    } finally {
      setProductsLoading(false);
    }
  }
  const [options, setOptions] = useState([]);
  async function populateOptions() {
    try {
      const response = await withTimeout(fetch(`${connection}/options`, { method: 'GET' }), 5000);
      const data = await response.json();
      if (data.success && Array.isArray(data.msg)) {
        setOptions(data.msg);
      }
    } catch (err) {
      console.error('Search error:', err);
      ShowError('Problem fetching options, something went wrong');
    }
  }

  //Handle options dropdown
  const [expanded, setExpanded] = useState({});

  const handlePress = (productId) => {
    setExpanded(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  //Handle Select row
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleRowSelect = (product) => {
    setSelectedProduct(product);
  };

  // Handle Add Product
  const handleAddProduct = async (newProduct) => { 
    try {
      const response = await fetch(`${connection}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price) || 0,
          course: newProduct.course,
          options: newProduct.options || [],
          image: newProduct.image || ''
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Error:', data.msg);
        ShowError('Server connection issue. Product not added');
        return { success: false, message: data.msg };
      }
        return { success: true, message: data.msg };
      
    } catch (error) {
      console.error('Request failed:', error);
      ShowError('Failed to add product. Please check your network connection')
      return { success: false, message: 'Failed to add product. Please check your network connection.' };
    }
  }

  // Handle Edit Product
  const handleEditProduct = async (product) => { 
    try {
      const response = await fetch(`${connection}/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          price: parseFloat(product.price) || 0,
          course: product.course,
          options: product.options || [],
          image: product.image || ''
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Error:', data.msg);
        ShowError('Server connection issue. Product not changed');
        return { success: false, message: data.msg };
      }
        populateProducts();
        return { success: true, message: data.msg };
      
    } catch (error) {
      console.error('Request failed:', error);
      ShowError('Failed to edit product. Please check your network connection')
      return { success: false, message: 'Failed to edit product. Please check your network connection.' };
    }
  }
  // Handle Delete Product 
  const [productToDelete, setProductToDelete] = useState(null);
  const ShowDeleteModal = () => {
    setProductToDelete(selectedProduct);
    setModalTitle('Delete Product')
    setModalBody(`Are you sure you would like to to delete ${selectedProduct.name}?`)
    setViewDeleteConfirmationModal(true);
  }
 async function DeleteProduct(selection) {
  if(!selection){
    setProductToDelete(null);
    return;
  } else {
    setProductToDelete(selection);
    try {
      const response = await fetch(`${connection}/products/${productToDelete._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
      if (!data.success) {
        console.error('Error:', data.msg);
        ShowError('Server connection issue. Product not deleted');
        return;
      }
  
      setProductToDelete(null);
      populateProducts();
  
    } catch (error) {
      ShowError('Failed to delete product. Please check your network connection');
    }
  }

}

  //Sales history
  const [reports, setReports] = useState([]); 
  const [todaysReport, setTodaysReport] = useState(null);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);

  async function populateReports() {
    setReportsLoading(true);
    if (!connection) {
      ShowError('Connection configuration is missing');
      setReportsLoading(false);
      return;
    }
    try {
      const response = await withTimeout(fetch(`${connection}/reports`, { method: 'GET' }), 5000);
      if (!response.ok) {
        const error = await response.json();
        const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
        setReportsLoading(false);
        return;
      }
  
      const data = await response.json();
  
      if (data.success && Array.isArray(data.msg)) {
        setReports(data.msg); // Updates reports state
      } else {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'No reports found';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
      }
    } catch (err) {
      console.error('Search error:', err);
      ShowError('There was a problem retrieving sales history. Please check your network connection');
    } finally {
      setReportsLoading(false);
    }
  }
  
  // Automatically run updateDailyReport when `reports` changes
  useEffect(() => {
    if (reports.length > 0) {
      updateDailyReport();
    }
  }, [reports]);
  
  function updateDailyReport() {
    if (reports && reports.length > 0) {
      const today = new Date();
      const todayISO = dateToIso(today);
  
  
      const reportMatch = reports.find((report) => {
        const reportDate = dateToIso(new Date(report.date));
        return reportDate === todayISO;
      });
  
      if (reportMatch) {
        setTodaysReport(reportMatch);
      } else {
        console.log('No report found for today');
      }
    }
  }
  
  const dateToIso = (date) => {
    return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  };
  
  const [viewReportConfirmationModal, setViewReportConfirmationModal] = useState(false)
  const handleReportPress = () => {
    if (todaysReport != null) {
      setReportModalVisible(true)
    } else {
      setModalTitle('No Report')
      setModalBody(`There is no report for today. Create one?`)
      setViewReportConfirmationModal(true);
    }
  }

  async function addReport(selection) {
    if(selection == false) {
      Alert.alert('No report created')
      return;
    }
    if (!connection) {
      ShowError('Connection configuration is missing');
      setReportsLoading(false);
      return;
    }
    try {
      const response = await withTimeout(fetch(`${connection}/reports/today`, { method: 'GET' }), 5000);
      if (!response.ok) {
        const error = await response.json();
        const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
        setReportsLoading(false);
        return;
      }
  
      const data = await response.json();
  
      if (data.success === true) {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'A report already exists for that day';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
        populateReports();
      } else {
        Alert.alert('Success', 'New report created');
        populateReports();
      }
    } catch (err) {
      console.error('Search error:', err);
      ShowError('There was a problem creating a new report. Please check your network connection');
    } finally {
      setReportsLoading(false);
    }
  }

  // On Load:
  useEffect(() => {
    populateProducts();
    populateReports();
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={{flex:1}}
                onPress={() => setSelectedProduct(null)}>
        <View style={styles.body}>
            <View style={styles.managerMainContainer}>
            <DataTable style={{ flex: 1 }}>
              <DataTable.Header>
              {headers.map((header, index) => (
                  <DataTable.Title
                    key={index}
                    sortDirection='descending'
                    onPress={() => sortBy(header)}
                  >
                    <Text variant='titleMedium'>{header}</Text>
                  </DataTable.Title>
                ))}
                  <DataTable.Title>
                    <Text variant='titleMedium'>Image</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text variant='titleMedium'>Options</Text>
                  </DataTable.Title>
              </DataTable.Header>
              <ScrollView contentContainerStyle={{ flexDirection: 'column' }}>
                {productsLoading ? (
                  <LoadingIndicator />
                ) : (
                  products && Array.isArray(products) && products.length > 0 && (
                    products.map((product) => (
                      <DataTable.Row
                        key={product._id}
                        onPress={() => handleRowSelect(product)}
                        style={[styles.largeRow,
                          selectedProduct && selectedProduct._id === product._id ? styles.largeHighlightedRow : null
                        ]}>
                        <DataTable.Cell><Text variant='bodyMedium' style={selectedProduct && product._id === selectedProduct._id ? styles.highlightedText : null}>
                          {product.name}</Text></DataTable.Cell>
                        <DataTable.Cell><Text variant='bodyMedium' style={selectedProduct && product._id === selectedProduct._id ? styles.highlightedText : null}>
                          ${product.price}</Text></DataTable.Cell>
                        <DataTable.Cell><Text variant='labelMedium' style={selectedProduct && product._id === selectedProduct._id ? styles.highlightedText : null}>
                          {product.course}</Text></DataTable.Cell>
                        <DataTable.Cell><Text variant='bodyMedium' numberOfLines={1} ellipsizeMode="tail" style={selectedProduct && product._id === selectedProduct._id ? styles.highlightedText : styles.unhighlightedText}>
                          {product.image}</Text></DataTable.Cell>
                        <DataTable.Cell>
                          {product.options && product.options.length > 0 ? (
                            <List.Section
                              title={<Text style={selectedProduct && product._id === selectedProduct._id ? styles.highlightedText : styles.unhighlightedText}>Options</Text>}
                              style={{
                                flexDirection: 'row',
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                                marginHorizontal: 0,
                                marginVertical: 0,
                                height:'95%'
                              }}
                              
                            >
                              <List.Accordion
                                style={selectedProduct && product._id === selectedProduct._id ? styles.highlightedAccordian : styles.unhighlightedAccordian}
                                expanded={expanded[product._id] || false}
                                onPress={() => handlePress(product._id)}
                              >
                                {product.options.map((option, index) => (
                                  <List.Item
                                    key={index}
                                    title={<Text variant="bodySmall" style={selectedProduct && product._id === selectedProduct._id ? styles.highlightedText : styles.unhighlightedText}>
                                      {option.name} - ${option.price}</Text>}
                                  />
                                ))}
                              </List.Accordion>
                            </List.Section>
                          ) : <Text variant='bodyMedium' style={[{marginLeft:'8%'}, selectedProduct && product._id === selectedProduct._id ? styles.highlightedText : null]}>No Options</Text>}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))
                  )
                )}
              </ScrollView>
            </DataTable>
            </View>
              <View style={[styles.managerButtonContainer, {flexDirection:'row'}]}>
                  <View style={[styles.buttonRow, {flex:1}]}>
                    <Button style={[styles.squareButton, styles.wideButton]}
                        mode="contained"
                        icon="plus"
                        onPress={() => setNewProductModalVisible(true)}>              
                        Add
                    </Button>
                    <Button style={[styles.squareButton, styles.wideButton]}
                          mode="contained"
                          icon="magnify"
                          onPress={() => setSearchModalVisible(true)}>              
                          Lookup
                    </Button>
                    <Button style={[styles.squareButton, styles.wideButton]}
                        mode="contained"
                        disabled={!selectedProduct}
                        onPress={() => setViewEditProductModal(true)}>             
                        Edit
                    </Button>   
                    <Button style={[styles.squareButton, styles.wideButton]}
                        mode="contained"
                        icon="delete"
                        disabled={!selectedProduct}
                        onPress={ShowDeleteModal}>              
                        Delete
                    </Button>
                  </View>
                  <View style={styles.verticalSeparator}></View>
                  <View style={[styles.buttonRow, {flex:1}]}>                  
                    <View style={styles.displayPortal}>
                      {reportsLoading ? (
                        <LoadingIndicatorSmall />
                      ) : (
                        <>
                          <Text variant='bodySmall'>Daily Total:</Text>
                          <Text variant='labelLarge'>
                            {todaysReport != null ? `$${todaysReport.total}` : 'N/A'}
                          </Text>
                        </>
                      )}
                      
                    </View>
                    <IconButton style={styles.squareButton}
                    icon="refresh"
                    mode="contained"
                    selected={true}
                    size={30}
                    disabled={reportsLoading}
                    onPress={populateReports} />              

                    <Button style={[styles.squareButton, styles.wideButton]}
                      mode="contained"
                      icon="poll"
                      disabled={reportsLoading}
                      onPress={handleReportPress}>              
                      Report
                    </Button>
                    
                  </View>
              </View>
          </View>
        </Pressable>
      {/* Modals */}
      <ErrorBoundary>
        <SearchModal  visible={searchModalVisible} onDismiss={() => setSearchModalVisible(false)} />
        <NewProduct   visible={newProductModalVisible} 
                      onDismiss={() => {setNewProductModalVisible(false), populateProducts()}} 
                      onAdd={handleAddProduct}/>
        <DeleteConfirmationModal
                      visible={viewDeleteConfirmationModal}
                      onDismiss={() => setViewDeleteConfirmationModal(false)}
                      title={modalTitle}
                      body={modalBody}
                      onSelect={DeleteProduct}/>
        <ReportConfirmationModal
                      visible={viewReportConfirmationModal}
                      onDismiss={() => setViewReportConfirmationModal(false)}
                      title={modalTitle}
                      body={modalBody}
                      onSelect={addReport}/>
        <EditProductModal
                      visible={viewEditProductModel}
                      onDismiss={() => setViewEditProductModal(false)}
                      product={selectedProduct}
                      onConfirm={handleEditProduct}/>
        <SalesReportModal
                      visible={reportModalVisible}
                      onDismiss={() => setReportModalVisible(false)}
                      reports={reports}
                      todaysReport={todaysReport}/>
      </ErrorBoundary>
      </SafeAreaView>
  );
}

export default Manager;