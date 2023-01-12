import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import "tabelement.css"
import { Alert, AlertTitle, Dialog, DialogActions, DialogContent, Grow, IconButton, List, Slide, Snackbar, TextField } from "@mui/material";
import { DoorBackOutlined, SettingsAccessibility, Sledding } from "@mui/icons-material";
import NewReleases from "@mui/icons-material/NewReleasesOutlined";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import axios from 'axios'
import DateFormat from "./././lib/DateFormat";
import ReloadCat from "./././images/reloadcat.gif"

