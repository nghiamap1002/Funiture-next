import { Box } from "@mui/material";
import {
  getGeoCityAction,
  getGeoDistrictAction,
  getGeoWardAction,
} from "@store/reducers/geo";
import { makeSelectGeo } from "@store/selectors/geo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../CustomDialog";
import CustomTabSelection from "../CustomTabSelection";
import ButtonAddress from "../RegisterBusiness/ButtonAddress";

const SelectAddress = ({
  label,
  required,
  address,
  openDialog,
  onCloseDialog,
  onOpenDialog,
  onSubmit,
  disabled,
  ...other
}) => {
  return (
    <Box {...other}>
      <ButtonAddress
        value={address || "Địa chỉ"}
        onClick={onOpenDialog}
        title={label}
        required={required}
        disabled={disabled}
      />
      <CustomDialog
        fullHeight
        open={openDialog}
        handleClose={onCloseDialog}
        dialogContent={<SelectAddressContent onSubmit={onSubmit} />}
      />
    </Box>
  );
};

const SelectAddressContent = ({ onSubmit }) => {
  const arrTab = Array(3)
    .fill()
    .map((item, index) => index);

  const [tab, setTab] = useState(arrTab[0]);
  const { city, district, ward, loading } = useSelector(makeSelectGeo);
  const [currentData, setCurrentData] = useState(city);
  const dispatch = useDispatch();
  const [selectData, setSelectData] = useState([]);

  const onChangeTab = (val) => {
    setTab(val);
  };

  const getData = (tab, value) => {
    switch (tab) {
      case 0:
        if (!city.length) dispatch(getGeoCityAction());
        break;
      case 1:
        dispatch(getGeoDistrictAction({ id: value.id }));
        break;
      case 2:
        dispatch(getGeoWardAction({ id: value.id }));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (tab < arrTab.length) {
      getData(tab, selectData[tab - 1]);
    }
  }, [tab]);

  useEffect(() => {
    switch (tab) {
      case 1:
        if (district.length) setCurrentData(district);
        break;
      case 2:
        if (ward.length) setCurrentData(ward);
        break;
      default:
        setCurrentData(city);
        break;
    }
  }, [city, district, ward, tab]);

  return (
    <CustomTabSelection
      selectData={selectData}
      setSelectData={setSelectData}
      arrTab={arrTab}
      tab={tab}
      setTab={setTab}
      loading={loading}
      onSubmit={onSubmit}
      data={currentData}
      label="Chọn địa chỉ"
      onChangeTab={onChangeTab}
    />
  );
};
export default SelectAddress;
