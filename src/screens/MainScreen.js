import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, Icon, Input, Item } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView, StatusBar } from 'react-native'
import Loading from '../component/Loading'
import { Context as ItemContext } from '../context/ItemContext'
import { Context as WHContext } from '../context/WHContext'
import { primary } from '../helper/colors'
import DrawerHeader from '../component/drawer/DrawerHeader'
import BDialog from '../component/dialog/BDialog'
import { dimension } from '../helper/sizes'

const MainScreen = ({ navigation }) => {
    const { state: itemState, loadStockWH, isLoadData } = useContext(ItemContext)
    const { state: whState, loadWH } = useContext(WHContext)
    const { stockListByWH, stockList } = itemState
    const { whList } = whState
    const [showDialog, setShowDialog] = useState(false)
    const [item, setItem] = useState(null)
    const [listItemWH, setListItemWh] = useState(null)
    const [cmpname, setCmpname] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        // const focus = navigation.addListener('focus', () => {
        //     loadData()
        // })
        async function fetchProfile() {
            const cmpname = await AsyncStorage.getItem('cmpname')
            setCmpname(cmpname)
        }
        setTimeout(() => {
            StatusBar.setBackgroundColor(primary);
        }, 100)
        fetchProfile()
        loadData()
    }, [isLoadData])

    const loadData = () => {
        loadStockWH()
        loadWH()
        doSearch(searchText)
    }

    const getListItemWH = (item_id, pid) => {
        const result = []
        const resultStock = stockList.filter(stock =>
            stock.id.toString() === item_id.toString() && (pid.length === 0 || stock.pid === pid)
        )
        resultStock.forEach(stock => {
            whList.forEach(wh => {
                if (wh.id.toString() === stock.wh_id.toString()) {
                    result.push({ whname: wh.name, qty: stock.qty })
                }
            })
        })
        setListItemWh(result)
    }

    const searchItem = (text) => {
        var result = []
        stockListByWH.forEach(stock => {
            if (stock.name.toLowerCase().includes(text.toLowerCase())) {
                result.push(stock)
            }
        })
        return result
    }

    const doSearch = (text) => {
        setSearchResult(null)
        if (text.length > 2) {
            setSearchResult(searchItem(text))
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerHeader
                title={cmpname}
                onMenuAction={() => navigation.openDrawer()}
            />
            <View style={styles.searchView}>
                <View style={styles.containerSearch}>
                    <Item style={{ height: 40, flex: 4 }}>
                        <Input
                            placeholder='Cari Item'
                            textContentType='none'
                            onChangeText={(text) => {
                                setSearchText(text)
                                doSearch(text)
                            }}
                            returnKeyType='search'
                            onSubmitEditing={() => {
                                console.log('submit')
                            }}
                            style={{ height: 50 }} />
                    </Item>
                    <Icon type='Feather' name='search' style={{ color: 'grey', fontSize: 20 }} />
                </View>
            </View>
            {searchResult && searchResult.length === 0 ?
                <View style={styles.emptyResultView}>
                    <Text>Item tidak ditemukan</Text>
                </View> :
                stockListByWH ?
                    <View>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={!stockListByWH}
                                    onRefresh={() => {
                                        loadData()
                                    }} />
                            }>
                            <FlatList
                                data={searchResult ? searchResult : stockListByWH}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => {
                                    const name = item.pid.length > 0 ? item.name + " - " + item.pid : item.name
                                    return (
                                        <>
                                            {index === 0 ?
                                                <HeaderView
                                                    code='Kode'
                                                    name='Nama'
                                                    stock='Stok' /> :
                                                null
                                            }
                                            <ItemView
                                                code={item.code}
                                                name={name}
                                                stock={item.qty}
                                                onDetail={() => {
                                                    setItem(item)
                                                    getListItemWH(item.id, item.pid)
                                                    setShowDialog(true)
                                                }} />
                                        </>
                                    )
                                }}
                            />
                        </ScrollView>
                    </View> :
                    <View style={styles.loadingContainer}>
                        <Loading color={primary} size={48} />
                    </View>

            }
            <BDialog
                isVisible={showDialog}
                children={
                    <View style={styles.containerDialog}>
                        <View style={styles.itemDialogView}>
                            <Text style={styles.txtDetail}>{item ? item.code : null}</Text>
                            <Text style={styles.txtDetail}>
                                {item ?
                                    item.pid.length > 0 ?
                                        item.name + " - " + item.pid :
                                        item.name
                                    : null}
                            </Text>
                        </View>
                        <View style={styles.itemDialogView}>
                            <Text style={styles.txtHeader}>Gudang</Text>
                            <Text style={styles.txtHeader}>Stok</Text>
                        </View>
                        {listItemWH &&
                            <FlatList
                                data={listItemWH}
                                keyExtractor={item => item.item_id}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.itemDialogView}>
                                            <Text style={styles.txtDetail}>{item.whname}</Text>
                                            <Text style={[styles.txtDetail, isEmptyStock(item.qty) ? { color: 'red' } : { color: 'black' }]}>{item.qty}</Text>
                                        </View>
                                    )
                                }}
                            />
                        }
                    </View>
                }
                onTouchOutside={() => setShowDialog(false)}
            />
        </View>
    )
}

const HeaderView = ({ code, name, stock }) => {
    return (
        <TouchableOpacity style={styles.itemView}>
            <Text style={[styles.txtHeader, { flex: 1.5 }]}>{code}</Text>
            <Text style={[styles.txtHeader, { flex: 4 }]}> {name}</Text>
            <Text style={[styles.txtHeader, { flex: 2.5 }]}> {stock}</Text>
        </TouchableOpacity>
    )
}

const ItemView = ({ code, name, stock, onDetail }) => {
    return (
        <TouchableOpacity style={styles.itemView}>
            <Text style={[styles.txtDetail, { flex: 1.5 }]}>{code}</Text>
            <Text style={[styles.txtDetail, { flex: 4 }]}> {name}</Text>
            <Text style={[styles.txtDetail, { flex: 2 }, isEmptyStock(stock) ? { color: 'red' } : { color: 'black' }]}> {stock}</Text>
            <TouchableOpacity style={{ flex: 0.5 }} onPress={onDetail}>
                <Icon type='Feather' name='eye' style={{ color: 'grey', fontSize: 20 }} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const isEmptyStock = (stock) => {
    if (stock.substring(0, 1) === '0') {
        return true
    }
    return false
}

const styles = StyleSheet.create({
    itemView: {
        flexDirection: 'row',
        margin: 15
    },
    loadingContainer: {
        justifyContent: 'center',
        flex: 1
    },
    txtHeader: {
        marginHorizontal: 5,
        fontSize: 14,
        fontWeight: 'bold'
    },
    txtDetail: {
        marginHorizontal: 5,
        fontSize: 13
    },
    containerDialog: {
        backgroundColor: 'white',
        padding: 15,
        width: dimension.width / 1.2
    },
    itemDialogView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    searchView: {
        backgroundColor: primary,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15
    },
    containerSearch: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5
    },
    emptyResultView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MainScreen