package com.caltrans.rusle.models;

import java.sql.Date;
// import java.util.Date;

public class Project {
	public static final int INVALID_ID = -999;
	private final int mId;
	private final String mName;
	private final float mArea;
	private final Date mStartDate;
	private final Date mEndDate;
	private final String mLocation;
	private final String mDescription;
	private final String mSiteDetails;
	
	public Project(int id, String name, float area, Date startDate, Date endDate, String location, String description, String siteDetails) {
		mId = id;
		mName = name;
		mArea = area;
		mStartDate = startDate;
		mEndDate = endDate;
		mLocation = location;
		mDescription = description;
		mSiteDetails = siteDetails;
	}
	
	public Project(String name, float area, Date startDate, Date endDate, String location, String description, String siteDetails) {
		this(INVALID_ID, name, area, startDate, endDate, location, description, siteDetails);
	}

	public int getId() {
		 return mId;
	 }
	
	public String getName() {
		return mName;
	}
	
	public float getArea() {
		return mArea;
	}
	
	public Date getStartDate() {
		return mStartDate;
	}
	
	public Date getEndDate() {
		return mEndDate;
	}
	
	public String getLocation() {
		return mLocation;
	}
	
	public String getDescription() {
		return mDescription;
	}
	
	public String getSiteDetails() {
		return mSiteDetails;
	}
	
	@Override
	public String toString() {
		return String.format("Id: %d, Name: %s, Area: %f, Start Date: %s, End Date: %s, Location: %s, Description: %s, Site Details: %s", mId, mName, mArea, mStartDate, mEndDate, mLocation, mDescription, mSiteDetails);
	}
}