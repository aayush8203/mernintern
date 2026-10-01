import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: [true, "Please provide a property name"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please provide a property description"],
      trim: true,
    },

    extraInfo: {
      type: String,
      default: "No extra information provided",
    },

    propertyType: {
      type: String,
      enum: ["house", "flat", "hotel", "guest house"],
      default: "house",
    },

    roomType: {
      type: String,
      enum: ["any type", "entire home", "room"],
      default: "any type",
    },

    maximumGuest: {
      type: Number,
      required: [true, "Please provide the maximum number of guests"],
      min: [1, "Maximum guests must be at least 1"],
    },

    amenities: [
      {
        name: {
          type: String,
          required: [true, "Please provide the name of the amenity"],
          enum: [
            "wifi",
            "kitchen",
            "parking",
            "pool",
            "air conditioning",
            "heating",
            "tv",
            "washer",
            "dryer",
            "gym",
          ],
        },

        icon: {
          type: String,
          required: [true, "Please provide the icon for the amenity"],
        },
      },
    ],

    images: {
      type: [
        {
          public_id: {
            type: String,
          },

          url: {
            type: String,
            required: [true, "Please provide the image URL"],
          },
        },
      ],

      validate: {
        validator: function (arr) {
          return arr.length <= 6;
        },
        message: "You can upload a maximum of 6 images",
      },
    },

    price: {
      type: Number,
      required: [true, "Please provide the price of the property"],
      default: 500,
      min: [0, "Price cannot be negative"],
    },

    address: {
      area: {
        type: String,
        required: [true, "Please provide the area"],
        trim: true,
      },

      city: {
        type: String,
        required: [true, "Please provide the city"],
        trim: true,
      },

      state: {
        type: String,
        required: [true, "Please provide the state"],
        trim: true,
      },

      country: {
        type: String,
        required: [true, "Please provide the country"],
        trim: true,
      },

      zipCode: {
        type: Number,
        required: [true, "Please provide the zip code"],
      },
    },

    currentBooking: [
      {
        bookingId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },

        fromDate: {
          type: Date,
        },

        toDate: {
          type: Date,
        },
        userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"

        }
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the user ID"],
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    checkInTime: {
      type: String,
      default: "12:00 PM",
    },

    checkOutTime: {
      type: String,
      default: "11:00 AM",
    },
  },

  {
    timestamps: true,
  }
);


// Generate slug automatically before saving
propertySchema.pre("save", function () {
  if (this.isModified("propertyName")) {
    this.slug = slugify(this.propertyName, {
      lower: true,
      strict: true,
    });
  }

  ;
});


// Convert city to lowercase before saving
propertySchema.pre("save", function () {
  if (this.address && this.address.city) {
    this.address.city = this.address.city.trim().toLowerCase();
  }

  ;
});


//
const Property = mongoose.models.Property ||mongoose.model("Property",propertySchema);

export default mongoose.model("Property", propertySchema);