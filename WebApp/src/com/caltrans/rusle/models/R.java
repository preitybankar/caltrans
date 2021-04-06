package com.caltrans.rusle.models;

public class R {
	private final String rValue;
	private final String location;
	

	public String getrValue() {
		return rValue;
	}

	public String getLocation() {
		return location;
	}

	
	public R(String rValue, String location) {
		this.rValue = rValue;
		this.location = location;
	}

	@Override
	public String toString() {
		return String.format("R value: %s, Location: %s, ", rValue, location);
	}
}
