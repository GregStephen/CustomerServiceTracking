﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.DataModels
{
    public class PropertySystem
    {
        public Guid Id { get; set; }

        public Guid PropertyId { get; set; }

        public DateTime InstallDate { get; set; }

        public string DisplayName { get; set; }

        public bool Enabled { get; set; }

        public string Notes { get; set; }

        public int Nozzles { get; set; }

        public string SerialNumber { get; set; }

        public bool Sold { get; set; }

        public int SprayCycles { get; set; }

        public int SprayDuration { get; set; }

        public DateTime NextServiceDate { get; set; }

        public int ServiceOptionId { get; set; }

        public Guid SystemId { get; set; }

        public BusinessSystem SystemInfo { get; set; }

    }
}
